
Well PostgreSQL 8.4 won't have complete support of
*Windowing Functions*, but it looks like it will be on par or slightly better
than what is available in SQL Server 2005, but not quite as good as
Oracle and DB2. So to summarize from discussions read.

[What will make it](http://www.postgresonline.com/journal/index.php?/archives/70-CTEs-and-Windowing-Functions-in-8.4.html):

* windowed aggregates
* cooperate with GROUP BY aggregates
* Ranking and ROW\_NUMBER()
* WINDOW clause

What will NOT make it:

* sliding window (window framing)
* lead(), lag(), etc. that reach for random rows
* user defined window functions


### Przykłady z GROUP BY

Wpisujemy:

    select deptno, ename
      from emp
    where deptno=10;
{:lang=sqlite}

Otrzymujemy:

     deptno | ename
    --------+--------
         10 | clark
         10 | king
         10 | miller

Wpisujemy:

    select deptno,
           count(*) as cnt,
           max(sal) as hi_sal,
           min(sal) as lo_sal
      from emp
    where deptno=10
    group by deptno;
{:lang=sqlite}

Otrzymujemy:

     deptno | cnt | hi_sal | lo_sal
    --------+-----+--------+--------
         10 |   3 |   5000 |   1300


### Prostszy przykład

Tworzymy tabelę i wpisujemy do niej dane:

    create table owoce (name varchar(32));
    insert into owoce values('jabłka');
    insert into owoce values('jabłka');
    insert into owoce values('jabłka');
    insert into owoce values('gruszki');
    insert into owoce values('śliwki');
{:lang=sqlite}

Zapytanie:

    select name from owoce;
{:lang=sqlite}

Odpowiedź:

      name
    ---------
     jabłka
     jabłka
     jabłka
     gruszki
     śliwki

Zapytanie:

    select name
      from owoce
    group by name;
{:lang=sqlite}

Odpowiedź:

      name
    ---------
     gruszki
     śliwki
     jabłka

Zapytanie:

    select name, count(*) as cnt
      from owoce
    group by name;
{:lang=sqlite}

Odpowiedź:

      name   | cnt
    ---------+-----
     gruszki |   1
     śliwki  |   1
     jabłka  |   3

Dodajemy nieco NULLi do tabelki z owocami:

    insert into owoce values(null);
    insert into owoce values(null);
    insert into owoce values(null);
{:lang=sqlite}

Zapytanie:

    select coalesce(name,'NULL') as name
      from owoce;
{:lang=sqlite}

Odpowiedź:

      name
    ---------
     jabłka
     jabłka
     jabłka
     gruszki
     śliwki
     NULL
     NULL
     NULL

Zapytanie:

    select coalesce(name,'NULL') as name,
           count(name) as cnt
      from owoce
    group by name;
{:lang=sqlite}

Odpowiedź, niestety niepoprawna, ponieważ
NULLe nie zostały policzone:

      name   | cnt
    ---------+-----
     gruszki |   1
     NULL    |   0
     śliwki  |   1
     jabłka  |   3

NULLe zostaną policzone jeśli zastąpimy
`count(name)` przez `count(*)`.


## Wracamy do EMP

Zapytanie:

    select deptno, count(*) as cnt
      from emp;
{:lang=sqlite}

nie jest poprawne składniowo. Jeśli w zapytaniu korzystamy
z funkcji grupującej, tutaj z *count()*,
to musi ona po czymś grupować, np. po *deptno*:

    select deptno, count(*) as cnt
      from emp
    group by deptno;
{:lang=sqlite}

Odpowiedź:

     deptno | cnt
    --------+-----
         20 |   5
         30 |   6
         10 |   3

Takie sobie zapytanie:

    select 'hello' as msg,
           1 as num,
           deptno,
           (select count(*) from emp) as total,
           count(*) as cnt
      from emp
    group by deptno
    order by deptno;
{:lang=sqlite}

I odpowiedź:

      msg  | num | deptno | total | cnt
    -------+-----+--------+-------+-----
     hello |   1 |     10 |    14 |   3
     hello |   1 |     20 |    14 |   5
     hello |   1 |     30 |    14 |   6


Kilkukrotne grupowanie (agregowanie), nieposortowana odpowiedź:

    select deptno, job, count(*) as cnt
      from emp
    group by deptno, job;
{:lang=sqlite}

posortowana odpowiedź:

    select deptno, job, count(*) as cnt
     from emp
    group by deptno, job
    order by deptno, job;
{:lang=sqlite}

Odpowiedź:

     deptno |    job    | cnt
    --------+-----------+-----
         10 | clerk     |   1
         10 | manager   |   1
         10 | president |   1
         20 | analyst   |   2
         20 | clerk     |   2
         20 | manager   |   1
         30 | clerk     |   1
         30 | manager   |   1
         30 | salesman  |   4


## Windowing

Window functions, like aggregate functions, perform an aggregation
on a defined group of rows, but rather than returning **one** value
per group, window functions can return **multiple** values for
each group.

The group of rows to perform the aggregation on is the *window*.


### Prosty przykład

Zwykłe zapytanie:

    select count(*) as cnt
      from emp;
{:lang=sqlite}

Zwykła odpowiedź:

     cnt
    -----
      14

Okienkowe zapytanie (requires PostgreSQL **8.4**):

    select ename,
           deptno,
           count(*) OVER() as cnt
      from emp
    order by 2;
{:lang=sqlite}

Odpowiedź:

     ename  | deptno | cnt
    --------+--------+-----
     miller |     10 |  14
     clark  |     10 |  14
     king   |     10 |  14
     scott  |     20 |  14
     jones  |     20 |  14
     smith  |     20 |  14
     adams  |     20 |  14
     ford   |     20 |  14
     ward   |     30 |  14
     turner |     30 |  14
     allen  |     30 |  14
     blake  |     30 |  14
     martin |     30 |  14
     james  |     30 |  14

### Kolejność obliczeń

    select ename,
           deptno,
           count(*) over() as cnt
      from emp
    where deptno=10
    order by 2;
{:lang=sqlite}

Odpowiedź:

     ename  | deptno | cnt
    --------+--------+-----
     clark  |     10 |   3
     king   |     10 |   3
     miller |     10 |   3

Klauzula WHERE, wykonywana jako pierwsza, ogranicza
liczbę wierszy do 3.

Tylko trzy wiersze są dostępne dla funkcji
okienkowej *over*, kiedy przetwarzanie dociera
do klauzuli *select*.


### Klauzula PARTITION BY

Z klauzuli PARTITION BY używamy do definiowania
*podziału* wierszy na grupy.

Zapytanie:

    select ename,
           deptno,
           count(*) over(partition by deptno) as cnt
      from emp
    order by 2;
{:lang=sqlite}

Odpowiedź:

     ename  | deptno | cnt
    --------+--------+-----
     miller |     10 |   3
     clark  |     10 |   3
     king   |     10 |   3
     scott  |     20 |   5
     jones  |     20 |   5
     smith  |     20 |   5
     adams  |     20 |   5
     ford   |     20 |   5
     ward   |     30 |   6
     turner |     30 |   6
     allen  |     30 |   6
     blake  |     30 |   6
     martin |     30 |   6
     james  |     30 |   6

Powyższe zapytanie jest bardziej zrozumiałe i efektywne
od takiego zapytania zwaracającego tę samą odpowiedź
(no prawie tę samą) co poprzednie zapytanie:

    select e.ename,
           e.deptno,
           (
             select count(*) from emp d
             where e.deptno=d.deptno
           ) as cnt
      from emp e
    order by 2;
{:lang=sqlite}

Funkcje okienkowe z PARTITION BY wykonują swoje obliczenia
niezależnie.

Zapytanie:

    select ename,
           deptno,
           count(*) over(partition by deptno) as dept_cnt,
           job,
           count(*) over(partition by job) as job_cnt
      from emp
    order by 2;
{:lang=sqlite}

Odpowiedź:

     ename  | deptno | dept_cnt |    job    | job_cnt
    --------+--------+----------+-----------+---------
     miller |     10 |        3 | clerk     |       4
     clark  |     10 |        3 | manager   |       3
     king   |     10 |        3 | president |       1
     adams  |     20 |        5 | clerk     |       4
     jones  |     20 |        5 | manager   |       3
     scott  |     20 |        5 | analyst   |       2
     ford   |     20 |        5 | analyst   |       2
     smith  |     20 |        5 | clerk     |       4
     blake  |     30 |        6 | manager   |       3
     james  |     30 |        6 | clerk     |       4
     allen  |     30 |        6 | salesman  |       4
     ward   |     30 |        6 | salesman  |       4
     turner |     30 |        6 | salesman  |       4
     martin |     30 |        6 | salesman  |       4

### A co z NULLami?

Klauzula PARTITION BY umieszcza NULLe w jednej grupie.

    select coalesce(comm, -1) as comm,
           count(*) over(partition by comm) as cnt
    from emp;
{:lang=sqlite}

Odpowiedź:

     comm | cnt
    ------+-----
        0 |   1
      300 |   1
      500 |   1
     1400 |   1
       -1 |  10
       -1 |  10
       -1 |  10
       -1 |  10
       -1 |  10
       -1 |  10
       -1 |  10
       -1 |  10
       -1 |  10
       -1 |  10

