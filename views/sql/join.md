
Tak jak w poprzednim projekcie, pliki z przykładowymi
tabelkami, wykorzystanymi w poniższych przykładach,
można pobrać repozytorium git:

    git clone git://manta.univ.gda.pl/~wbzyl/cookbook

W repozytorium umieściłem też plik *join.txt* z zadaniami
ale bez rozwiązań.

### Jedna tabelka na drugiej

Chcemy uzyskać taki efekt:

     ename_and_dname | deptno
    -----------------+--------
     clark           |     10
     king            |     10
     miller          |     10
     --------        |
     accounting      |     10
     research        |     20
     sales           |     30
     operations      |     40

Wskazówka: skorzystać z UNION ALL, oraz tabelki *t1*.

Odpowiedź:

    select ename as ename_and_dname, deptno
      from emp
    where deptno=10
    union all
    select '--------', null
      from t1
    union all
    select dname, deptno
      from dept;



### Łączenie powiązanych wierszy

Na przykład, chcemy wypisać nazwiska wszystkich zatrudnionych
w Dept 10 wraz miejscowością w której jest zlokalizowany Dept:

     ename  |   loc
    --------+----------
     clark  | new york
     king   | new york
     miller | new york

Odpowiedź:

    select e.ename, d.loc
      from emp e, dept d
    where e.deptno = d.deptno
      and e.deptno = 10;



### Wyszukujemy podobne wiersze między tabelami

Załóżmy, że jest kilka kolumn na których możemy wykonać złączenie.
Na przykład

    create view V
    as
    select ename, job, sal
      from emp
    where job = 'clerk';


Zapytanie:

    select * from V;


Wypisuje coś takiego:

     ename  |  job  | sal
    --------+-------+------
     smith  | clerk |  800
     adams  | clerk | 1100
     james  | clerk |  950
     miller | clerk | 1300

Ta odpowiedź nas nie zadowala.

Chcemy uzyskać coś takiego:

     empno | ename  |  job  | sal  | deptno
    -------+--------+-------+------+--------
      7369 | smith  | clerk |  800 |     20
      7867 | adams  | clerk | 1100 |     20
      7900 | james  | clerk |  950 |     30
      7934 | miller | clerk | 1300 |     10

Odpowiedź:

    select empno, ename, job, sal, deptno
      from emp
    where (ename, job, sal) in (
      select ename, job, sal from emp
      intersect
      select ename, job, sal from V
    );



### Pobieramy wiersze z jednej tabeli, których nie ma w drugiej tabeli

Na przykład, DEPTNO 40 jest w tabeli DEPT i nie występuje w tabeli EMP.

Chcemy uzyskać taki wynik:

     deptno
    --------
         40

Odpowiedź:

    select deptno from dept
    except
    select deptno from emp;



### Pobieramy wiersze z jednej tabeli, które nie mają odpowiadających im wierszy w drugiej tabeli

Na przykład, chcemy wyszukać DEPTs bez pracowników:

     deptno |   dname    |  loc
    --------+------------+--------
         40 | operations | boston

Coś takie nazywane jest czasami *anti-join*.

Odpowiedź:

    select d.*
      from dept d left outer join emp e
        on (d.deptno = e.deptno)
    where e.deptno is null;


Jak to działa?

    select e.ename, e.deptno as emp_deptno, d.*
      from dept d left outer join emp e
        on (d.deptno = e.deptno);


### \*\*Czy dwie tabele zawierają takie same dane?

Utwórzmy następujący widok:

    create view V
    as
    select * from emp where deptno != 10
    union all
    select * from emp where ename = 'ward';


Zapytanie:

    select * from V;


Daje taki rezultat:

     empno | ename  |   job    | mgr  |  hiredate  | sal  | comm | deptno
    -------+--------+----------+------+------------+------+------+--------
      7369 | smith  | clerk    | 7902 | 1980-12-17 |  800 |      |     20
      7499 | allen  | salesman | 7698 | 1981-02-20 | 1600 |  300 |     30
      7521 | ward   | salesman | 7698 | 1981-02-22 | 1250 |  500 |     30
      7566 | jones  | manager  | 7839 | 1981-04-02 | 2975 |      |     20
      7654 | martin | salesman | 7698 | 1981-09-28 | 1250 | 1400 |     30
      7698 | blake  | manager  | 7839 | 1981-05-01 | 2850 |      |     30
      7788 | scott  | analyst  | 7566 | 1982-12-09 | 3000 |      |     20
      7844 | turner | salesman | 7698 | 1981-09-08 | 1500 |    0 |     30
      7867 | adams  | clerk    | 7788 | 1983-01-12 | 1100 |      |     20
      7900 | james  | clerk    | 7698 | 1981-12-03 |  950 |      |     30
      7902 | ford   | analyst  | 7566 | 1981-12-03 | 3000 |      |     20
      7521 | ward   | salesman | 7698 | 1981-02-22 | 1250 |  500 |     30

Tabelka V różni się od tabelki EMP pracownikami zatrudnionymi
w DEPTNO 10 oraz pracownikiem 'WARD'.

Chcemy otrzymać następujący rezultat:

     empno | ename  |    job    | mgr  |  hiredate  | sal  | comm | deptno | cnt
    -------+--------+-----------+------+------------+------+------+--------+-----
      7521 | ward   | salesman  | 7698 | 1981-02-22 | 1250 |  500 |     30 |   2
      7839 | king   | president |      | 1981-11-17 | 5000 |      |     10 |   1
      7934 | miller | clerk     | 7782 | 1982-01-23 | 1300 |      |     10 |   1
      7521 | ward   | salesman  | 7698 | 1981-02-22 | 1250 |  500 |     30 |   1
      7782 | clark  | manager   | 7839 | 1981-06-09 | 2450 |      |     10 |   1

Odpowiedź:

    (
      select empno, ename, job, mgr, hiredate, sal, comm, deptno, count(*) as cnt
        from V
      group by empno, ename, job, mgr, hiredate, sal, comm, deptno
      except
      select empno, ename, job, mgr, hiredate, sal, comm, deptno, count(*) as cnt
        from emp
      group by empno, ename, job, mgr, hiredate, sal, comm, deptno
    )
    union all
    (
      select empno, ename, job, mgr, hiredate, sal, comm, deptno, count(*) as cnt
        from emp
      group by empno, ename, job, mgr, hiredate, sal, comm, deptno
      except
      select empno, ename, job, mgr, hiredate, sal, comm, deptno, count(*) as cnt
        from V
      group by empno, ename, job, mgr, hiredate, sal, comm, deptno
    );


Dyskusja:

1. Znajdź wszystkie wiersze w EMP - V
2. Znajdź wszystkie wiersze w V - EMP
3. Połącz rezultaty za pomocą UNION ALL

Zapytanie w pierwszych nawiasach `( ... )` wypisuje:

     empno | ename |   job    | mgr  |  hiredate  | sal  | comm | deptno | cnt
    -------+-------+----------+------+------------+------+------+--------+-----
      7521 | ward  | salesman | 7698 | 1981-02-22 | 1250 |  500 |     30 |   2

Zapytanie w drugich nawiasach `( ... )` wypisuje:

     empno | ename  |    job    | mgr  |  hiredate  | sal  | comm | deptno | cnt
    -------+--------+-----------+------+------------+------+------+--------+-----
      7839 | king   | president |      | 1981-11-17 | 5000 |      |     10 |   1
      7934 | miller | clerk     | 7782 | 1982-01-23 | 1300 |      |     10 |   1
      7521 | ward   | salesman  | 7698 | 1981-02-22 | 1250 |  500 |     30 |   1
      7782 | clark  | manager   | 7839 | 1981-06-09 | 2450 |      |     10 |   1

Teraz jest chyba jasne do czego była potrzebna klauzula GROUP BY.
