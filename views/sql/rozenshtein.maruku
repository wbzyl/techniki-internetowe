
Przykłady z książeczki Davida Rozenshteina, *The Essence of SQL*.



## Encje i tabele

Student:

    create table students
    (
       sno integer,
       sname varchar(10),
       age integer
    );
{:lang=sqlite}

Przedmiot:

    create table courses
    (
       cno varchar(5),
       title varchar(10),
       credits integer
    );
{:lang=sqlite}

Profesor:

    create table professors
    (
       lname varchar(10),
       dept  varchar(10),
       salary integer,
       age integer
    );
{:lang=sqlite}

Tabela studentów i przedmiotów na które uczęszczają:

    create table take
    (
       sno integer,
       cno varchar(5)
    );
{:lang=sqlite}

Tabela profesorów i przedmiotów których nauczają:

    create table teach
    (
       lname varchar(10),
       cno varchar(5) 
    );
{:lang=sqlite}

**Zadanie:** Narysować diagram ERD do powyższych tabelek.

Wprowadzamy dane.

Studenci:

    insert into students values (1,'aaron',20);
    insert into students values (2,'chuck',21);
    insert into students values (3,'doug',20);
    insert into students values (4,'maggie',19);
    insert into students values (5,'steve',22);
    insert into students values (6,'jing',18);
    insert into students values (7,'brian',21);
    insert into students values (8,'kay',20);
    insert into students values (9,'gillian',20);
    insert into students values (10,'chad',21);
{:lang=sqlite}

Przedmioty:

    insert into courses values ('CS112','physics',4);
    insert into courses values ('CS113','calculus',4);
    insert into courses values ('CS114','history',4);
{:lang=sqlite}

Profesorowie:

    insert into professors values ('choi','science',400,45);
    insert into professors values ('gunn','history',300,60);
    insert into professors values ('mayer','math',400,55);
    insert into professors values ('pomel','science',500,65);
    insert into professors values ('feuer','math',400,40);
{:lang=sqlite}

Pozostałe dwie tabele:

    insert into take values (1,'CS112');
    insert into take values (1,'CS113');
    insert into take values (1,'CS114');
    insert into take values (2,'CS112');
    insert into take values (3,'CS112');
    insert into take values (3,'CS114');
    insert into take values (4,'CS112');
    insert into take values (4,'CS113');
    insert into take values (5,'CS113');
    insert into take values (6,'CS113');
    insert into take values (6,'CS114');
      
    insert into teach values('choi','CS112');
    insert into teach values('choi','CS113');
    insert into teach values('choi','CS114');
    insert into teach values('pomel','CS113');
    insert into teach values('mayer','CS112');
    insert into teach values('mayer','CS114');
{:lang=sqlite}

# Zapytania z zaprzeczeniem

## Zadanie 1

Znaleźć wszystkich studentów, którzy nie uczęszczają na CS112.

Poniższe zapytanie zwraca błędne wyniki:

    select *
      from students
    where sno in ( select sno
                     from take
                   where cno != 'CS112' );
{:lang=sqlite}

Wyniki:

     sno | sname  | age 
    -----+--------+-----
       1 | aaron  |  20
       3 | doug   |  20
       4 | maggie |  19
       5 | steve  |  22
       6 | jing   |  18

Wyniki są błędne ponieważ zapytanie odpowiada na pytanie:
„Kto uczęszcza na zajęcia, które nie są CS112?”
a studenci (zwykle) uczęszczają na kilka zajęć
i (czasami) nie uczęszczają na żadne zajęcia. 

Odpowiedź:

    select s.sno, s.sname, s.age
      from students s left join take t
        on (s.sno = t.sno)
      group by s.sno, s.sname, s.age
    having max(case when t.cno = 'CS112' then 1 else 0 end) = 0
    order by s.sno;
{:lang=sqlite}

Prawidłowy wynik:

     sno |  sname  | age 
    -----+---------+-----
       5 | steve   |  22
       6 | jing    |  18
       7 | brian   |  21
       8 | kay     |  20
       9 | gillian |  20
      10 | chad    |  21

### Rozwiązanie

Tworzymy dodatkową kolumnę w której zapisujemy 1
jeśli student uczęszcza na CS112; w przeciwnym wypadku — 0
(left outer join zwraca studentów nie chodzących na żadne zajęcia):

    select s.sno, s.sname, s.age, 
           case when t.cno = 'CS112'
                then 1
                else 0
           end as takes_CS112
    from students s left join take t
      on (s.sno = t.sno);
{:lang=sqlite}

Wynik:
    
     sno |  sname  | age | takes_cs112 
    -----+---------+-----+-------------
       1 | aaron   |  20 |           1
       1 | aaron   |  20 |           0
       1 | aaron   |  20 |           0
       2 | chuck   |  21 |           1
       3 | doug    |  20 |           1
       3 | doug    |  20 |           0
       4 | maggie  |  19 |           1
       4 | maggie  |  19 |           0
       5 | steve   |  22 |           0
       6 | jing    |  18 |           0
       6 | jing    |  18 |           0
       7 | brian   |  21 |           0
       8 | kay     |  20 |           0
       9 | gillian |  20 |           0
      10 | chad    |  21 |           0


### Sprytne rozwiązanie

    select * 
      from students
    where sno not in ( select sno
                         from take
                       where cno = 'CS112' );
{:lang=sqlite}


## Zadanie 2

Wypisać wszystkich studentów, którzy uczęszczają
na CS112 **albo** CS114.

Poniższe zapytanie wygląda obiecująco,
ale zwraca błędny wynik:

    select * 
      from students
    where sno in ( select sno
                     from take
                   where cno != 'CS112' and cno != 'CS114' );
{:lang=sqlite}

Wynik:

     sno | sname  | age 
    -----+--------+-----
       1 | aaron  |  20
       4 | maggie |  19
       5 | steve  |  22
       6 | jing   |  18

Wynik jest błędny, ponieważ AARON uczęszcza na oba wykłady,
STEVE chodzi tylko na CS113 i brak studenta CHUCK,
który chodzi tylko na CS112.

Odpowiedź:

    select s.sno, s.sname, s.age
      from students s, take t
    where s.sno = t.sno
    group by s.sno, s.sname, s.age
    having sum(case when t.cno in ('CS112', 'CS114')
                    then 1 else 0 end) = 1;
{:lang=sqlite}

Wynik:

     sno | sname  | age 
    -----+--------+-----
       2 | chuck  |  21
       4 | maggie |  19
       6 | jing   |  18

### Rozwiązanie

Zaczynamy od inner join tabeli STUDENTS z tabelą TAKE,
wykluczając w ten sposób studentów nie uczęszczających
na żadne zajęcia. Następnie korzystamy z CASE
oznaczając czy student chodzi (1) lub nie (0)
na odpowiednie zajęcia:

    select s.sno, s.sname, s.age,
           case when t.cno in ('CS112', 'CS114')
                then 1 else 0 end as takes_either_or
      from students s, take t
    where s.sno = t.sno;
{:lang=sqlite}

Wynik:

     sno | sname  | age | takes_either_or 
    -----+--------+-----+-----------------
       1 | aaron  |  20 |               1
       1 | aaron  |  20 |               0
       1 | aaron  |  20 |               1
       2 | chuck  |  21 |               1
       3 | doug   |  20 |               1
       3 | doug   |  20 |               1
       4 | maggie |  19 |               1
       4 | maggie |  19 |               0
       5 | steve  |  22 |               0
       6 | jing   |  18 |               0
       6 | jing   |  18 |               1

Teraz sumujemy '1':

    select s.sno, s.sname, s.age,
           sum(case when t.cno in ('CS112', 'CS114')
                then 1 else 0 end) as takes_either_or
      from students s, take t
    where s.sno = t.sno
    group by s.sno, s.sname, s.age;
{:lang=sqlite}

Wynik:

     sno | sname  | age | takes_either_or 
    -----+--------+-----+-----------------
       3 | doug   |  20 |               2
       2 | chuck  |  21 |               1
       5 | steve  |  22 |               0
       6 | jing   |  18 |               1
       1 | aaron  |  20 |               2
       4 | maggie |  19 |               1

Teraz pozostaje wybrać tylko studentów z '1' w kolumnie
TAKES\_EITHER\_OR.

### Sprytne rozwiązanie

    select s.sno, s.sname, s.age 
      from students s, take t
    where s.sno = t.sno
      and t.cno in ('CS112', 'CS114')
      and s.sno not in ( select a.sno
                           from take a, take b 
                         where a.sno = b.sno
                           and a.cno = 'CS112'
                           and b.cno = 'CS114' );
{:lang=sqlite}
                           

## Zadanie 3

Znaleźć wszystkich studentów uczęszczających 
**tylko** na przedmiot CS112.

Poniższe zapytanie nie zwraca poprawnego wyniku:

    select s.* 
      from students s, take t
    where s.sno = t.sno and t.cno = 'CS112';
{:lang=sqlite}

Wynik:

     sno | sname  | age 
    -----+--------+-----
       1 | aaron  |  20
       2 | chuck  |  21
       3 | doug   |  20
       4 | maggie |  19

Powyższa odpowiedź nie jest prawidłowa, ponieważ tylko student CHUCK
uczęszcza tylko na CS112.
Studenci AARON, DOUG i MAGGIE uczęszczają jeszcze na inne przedmioty.

Odpowiedź:

    select s.*
      from students s,
           take t1,
           ( select   sno
               from   take
             group by sno
             having   count(*) = 1 ) t2
    where s.sno = t1.sno 
      and t1.sno = t2.sno
      and t1.cno = 'CS112';
{:lang=sqlite}

Wynik:

     sno | sname | age 
    -----+-------+-----
       2 | chuck |  21


### Rozwiązanie

Piszemy dwa zapytania:

1. Którzy studenci uczęszczają tylko na jedne zajęcia?
2. Którzy studenci uczęszczają na CS112?

Tak może wyglądać zapytanie realizujące powyższy plan:

    select t1.*
      from take t1,
           ( select   sno
               from   take
             group by sno
             having   count(*) = 1 ) t2
    where t1.sno = t2.sno and t1.cno = 'CS112';
{:lang=sqlite}

Wynik:

     sno |  cno  
    -----+-------
       2 | CS112

Teraz pozostało wykonać złączenie z tabelą STUDENTS
aby odzczytać dane studenta o *sno=2*.

### Sprytne rozwiązanie

    select s.*
      from students s, take t
    where s.sno = t.sno
      and s.sno not in ( select sno 
                           from take
                         where  cno != 'CS112' );
{:lang=sqlite}
