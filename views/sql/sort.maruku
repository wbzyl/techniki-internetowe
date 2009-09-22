
Tak jak w poprzednim projekcie, pliki z przykładowymi
tabelkami, wykorzystanymi w poniższych przykładach,
można pobrać repozytorium git:

    git clone git://manta.univ.gda.pl/~wbzyl/cookbook

W repozytorium umieściłem też plik *SELECT.txt* z zadaniami
ale bez rozwiązań.


### Wypisujemy posortowane dane z wybranej kolumny

Poniższe dane, z tabeli EMP, dla pracowników zatrudnionych w DEPTNO o numerze 10,
zostały posortowane rosnąco wzgledem SAL:
 
     ename  |    job    | sal  
    --------+-----------+------
     miller | clerk     | 1300
     clark  | manager   | 2450
     king   | president | 5000

Skorzystać z klauzuli: `order by`.

    select ename, job, sal 
      from emp 
    where deptno = 10 
    order by sal asc;
{:lang=sqlite}


### Chcemy posortować dane z wybranych kolumn

Dane z tabeli EMP sortujemy rosnąco względem DEPTNO 
i względem SAL malejąco:

     empno | deptno | sal  | ename  |    job    
    -------+--------+------+--------+-----------
      7839 |     10 | 5000 | king   | president
      7782 |     10 | 2450 | clark  | manager
      7934 |     10 | 1300 | miller | clerk
      7788 |     20 | 3000 | scott  | analyst
      7902 |     20 | 3000 | ford   | analyst
      ...

Nazwy kolumn oddzielamy przecinkami:

    select empno, deptno, sal, ename, job 
      from emp 
    order by deptno asc, sal desc;
{:lang=sqlite}


### Sortujemy wyniki zapytania względem części łańcucha

Chcemy przygotować zestawienie nazwisk zatrudnionych 
osób i ich stanowisk posortowanych względem
ostatnich dwóch liter nazwy pracy:

    select ename, job
      from emp 
    order by substr(job, length(job)-1);
{:lang=sqlite}

albo pierwszych dwóch liter nazwy pracy:

    select ename, job
      from emp 
    order by substr(job, 1, 2);
{:lang=sqlite}


### Sortowanie danych alfanumerycznych 

Rozważmy następujący widok:

    create view V
    as
    select ename||' '||deptno as data
      from emp;
    select data from V;
{:lang=sqlite}

Kolumna DATA zawiera „mieszane” dane: tekst plus liczba.
Chcemy posortować dane w tej kolumnie względem
tekstu (ENAME) albo liczby (DEPTNO).

Skorzystać z funkcji: `replace` oraz `translate`.

Przykłady:

    select translate(data, '0123456789', '##########') from V;
{:lang=sqlite}
      
    smith ##
    allen ##
    ward ##
    ...

    select replace(data, 
                   replace(
                           translate(data, '0123456789', '##########'), 
                           '#', 
                           ''
                          ), 
                   '') from V;
{:lang=sqlite}

    20
    30
    30
    ...

Dane posortowane wzgledem liczby DEPTNO:

    select data 
      from V 
    order by replace(data, 
                     replace(
                             translate(data, '0123456789', '##########'), 
                             '#', 
                             ''
                            ), 
                     '');
{:lang=sqlite}

Dane posortowane wzgledem liczby ENAME:

    select data
      from V
    order by replace(translate(data, '0123456789', '##########'), 
                     '#', 
                     '');
{:lang=sqlite}


### Radzimy sobie z wartością NULL w trakcie sortowania

Chcemy posortować wiersze tabelki EMP względem kolumny
COMM. Kolumna COMM może zawierać wartości NULL,
ponieważ nie każdy pracownik dostaje premię.

To nie jest dobre rozwiązanie:

    select ename, sal, comm 
      from emp 
    order by comm ASC;
{:lang=sqlite}

To też nie jest dobre rozwiązanie:

    select ename, sal, comm 
      from emp 
    order by comm DESC;
{:lang=sqlite}

Chcemy aby wartości NULL były pierwsze, i po nich
mają zostać wypisane premie uporządkowane rosnąco.

    select ename, sal, comm
      from (
             select ename, sal, comm, 
                    case when comm is null then 0 else 1 end as is_null
               from emp
           ) x
    order by is_null ASC, comm ASC;
{:lang=sqlite}

Tak to ma wyglądać:

     ename  | sal  | comm 
    --------+------+------
     miller | 1300 |     
     adams  | 1100 |     
     ...
     king   | 5000 |     
     turner | 1500 |    0
     allen  | 1600 |  300
     ward   | 1250 |  500
     martin | 1250 | 1400

### Porządek zależy od danych

Na przykład, jeśli JOB, to *salesman*, to 
sortujemy względem COMM; w przeciwnym wypadku,
sortujemy względem SAL.

    select ename, sal, job, comm
      from emp
    order by case when job = 'salesman' then comm else sal end;
{:lang=sqlite3}

Tak to ma wyglądać:

     ename  | sal  |    job    | comm 
    --------+------+-----------+------
     turner | 1500 | salesman  |    0
     allen  | 1600 | salesman  |  300
     ward   | 1250 | salesman  |  500
     smith  |  800 | clerk     |     
     james  |  950 | clerk     |     
     adams  | 1100 | clerk     |     
     miller | 1300 | clerk     |     
     martin | 1250 | salesman  | 1400
     clark  | 2450 | manager   |     
     ...

A tak można to wyjaśnić:

    select ename, sal, job, comm,
           case when job = 'salesman' then comm else sal end as order
      from emp
    order by 5;

(Niestety tutaj pojawia się dodatkowa i zbędna kolumna.)
