
Pliki z danymi pobieramy z repozytorium git:

    git clone git://manta.univ.gda.pl/~wbzyl/cookbook


#### Chcemy odczytać wszystkie dane z tabeli.

    select *
      from emp;
    select empno, ename, job, sal, mgr, hiredate, comm, deptno
      from emp;


albo tylko dla niektórych kolumn:

    select ename, deptno, sal
      from emp;



#### Chcemy odczytać wiersze z tabeli spełniające pewne warunki.

    select *
      from emp
    where deptno = 10;


    select *
      from emp
    where deptno = 10
      or comm is not null
      or sal <= 2000 and deptno = 20;


Zmieniamy kolejność wykonywania działań:

    select *
      from emp
    where (
             deptno = 10
             or comm is not null
             or sal <= 2000
          )
      and deptno = 20;



#### Chcemy zmienić nazwy kolumn na bardziej zrozumiałe.

    select sal as wynagrodzenie, comm as premia
      from emp;



#### Jak poprawić, poniższe niedziałające zapytanie?

    select sal as wynagrodzenie, comm as premia
      from emp
    where salary < 5000;


Uwaga: to nie jest zadowalające rozwiązanie:

    select sal as wynagrodzenie, comm as premia
      from emp
    where wynagrodzenie < 5000;


Atrybutu *wynagrodzenie* nie ruszamy.

Rozwiązanie:

    select *
      from (
             select sal as wynagrodzenie, comm as premia
               from emp
           ) x
    where wynagrodzenie < 5000;



#### Chcemy zwrócić wartości z kilku kolumn w jednej kolumnie.

Na przykład tak:

    clark works as a manager
    king works as a president

Rozwiązanie:

    select ename||' works as a' ||job as msg
      from emp
    where deptno = 10;



#### Chcemy wykonać operację **if–else**.

Na przykład chcielibyśmy uzyskać coś takiego:

    ename             sal status
    ---------- ---------- ---------
    smith             800 underpaid
    allen            1600 underpaid
    ward             1250 underpaid
    jones            2975 ok
    martin           1250 underpaid
    blake            2850 ok
    clark            2450 ok
    scott            3000 ok
    king             5000 overpaid
    turner           1500 underpaid
    ...

gdzie `underpaid` oznacza, że wynagrodzenie jest mniejsze od 2000.

    select ename, sal,
           case when sal <= 2000 then 'underpaid'
                when sal >= 4000 then 'overpaid'
                else 'ok'
           end as status
      from emp;



#### Jak ograniczyć liczbę wierszy zwracanych przez zapytanie?

    select *
      from emp limit 4;


#### Jak uzyskać 4 losowe wiersze z tabeli? A jak — 8 wierszy?

    select ename, job
      from emp
    order by random() limit 5;



#### Jak pobrać z tabeli tylko te wiersze, które mają NULL w określonej kolumnie?

Wszystkie wiersze z `null` w określonej kolumnie:

    select *
      from emp
    where comm is null;


Jak podmienić `null` na non-ull?

    select ename, coalesce(comm, 0)
      from emp;


Albo bez `coalesce`:

    select case
           when comm is null then 0
           else comm
           end
      from emp;



#### Chcemy pobrać tylko te wiersze z tabeli, które pasują do podanego wzorca.

Przykłady:

    select ename, job, deptno
      from emp
    where deptno in (10, 20);


    select ename, job
      from emp
    where ename like '%i%' or job like '%er';

