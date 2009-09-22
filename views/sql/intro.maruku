
Użyteczne linki:

* [Dokumentacja](http://www.postgresql.org/docs)
* [Postgres OnLine Journal](http://www.postgresonline.com):
  An in-depth Exploration of the PostgreSQL Open Source Database
* [Weekly News](http://www.postgresql.org/community/weeklynews)


## Konfiguracja PostgreSQL na Mancie

Paczki z PostgresSQL pobieramy z
[PGDG RPMs for Fedora - Yum Repository 
Configuration](http://yum.pgsqlrpms.org/reporpms/repoview/pgdg-fedora.html)

    postgresql-8.4devel_20090310-1PGDG.f9.i386
    postgresql-devel-8.4devel_20090310-1PGDG.f9.i386
    postgresql-libs-8.4devel_20090310-1PGDG.f9.i386
    postgresql-server-8.4devel_20090310-1PGDG.f9.i386

Po instalacji inicjalizujemy bazę danych:

    service postgresql initdb

**Dopiero wersja 8.4 ma funkcje okienkowe.**

W pliku */var/lib/pgsql/data/pg\_hba.conf*
konfigurujemy dostęp klientów do bazy (dokładniej
użytkowników bazy z uprawnieniem do logowania).

Fragment tego pliku:

    # METHOD can be "trust", "reject", "md5", "crypt", 
    # "password", "gss", "sspi", "krb5", "ident", "pam" or "ldap".  
    # Note that "password" sends passwords in clear text; 
    # "md5" is preferred since it sends encrypted passwords.
    # TYPE   DATABASE    USER   METHOD OPTION
      local   all         all                               ident
      host    all         all         127.0.0.1/32          ident
      host    all         all         ::1/128               ident
    # local   all         all                               password

HBA w nazwie pliku, to skrótowiec od *host-based authentication*.

Następnie konfigurujemy logging w pliku
*/var/lib/pgsql/data/postgresql.conf*

    # - When to Log -
    client_min_messages = warning

## Tworzenie i usuwanie kont użytkowników

Te zadania może wykonać tylko superużytkownik bazy.
W Fedorze jest nim użytkownik **postgres**.

Zabezpieczenie hasłem konta superużytkownika bazy
można zrobić tak:

    su postgres
    psql
    postgres=# alter role postgres with password 'BANG!';

Dopiero teraz w pliku konfiguracyjnym komentujemy wiersz z 
*ident* i odkomentowujemy wiersz z *password* 
i restartujemy serwer:

    /etc/init.d/postgresql restart

Od teraz, przy logowaniu do bazy, będziemy musieli wpisywać hasło.

### Zakładanie pierwszego konta

Użytkownik bazy: *wbzyl*. Baza też o nazwie *wbzyl*:

    createuser --unencrypted --pwprompt --echo wbzyl
    Enter password for new role: 
    Enter it again: 
    Shall the new role be a superuser? (y/n) n
    Shall the new role be allowed to create databases? (y/n) y
    Shall the new role be allowed to create more new roles? (y/n) n
    Password: 
    CREATE ROLE wbzyl UNENCRYPTED PASSWORD 'bang!' \
      NOSUPERUSER CREATEDB NOCREATEROLE INHERIT LOGIN;

Opcjonalnie, ponieważ może to zrobić sam użytkownik, zakładamy bazę:

    createdb -O wbzyl -E utf8 wbzyl

### Usuwanie konta użytkownika

Aby usunąć użytkownika bazy, musimy wcześniej
usunąć wszystkie bazy których jest właścicielem:

    dropdb wbzyl
    dropuser wbzyl

### Zmiana hasła użytkownika bazy

Swoje hasło możemy zawsze zmienić w następujący sposób:

    psql -U wbzyl
    wbzyl=> alter role wbzyl with password 'bang!bang!';
    wbzyl=> \q


## Terminal PSQL

Program *psql*, to interaktywny terminal dla PostgreSQL.

Z bazą na mancie można się łączyć zdalnie w taki sposób:

    psql -h 153.19.7.200 [nazwa_bazy]

Ważniejsze opcje tego programu:

    psql [ option... ]  [ dbname [ username ] ]
       -f filename
          Use the file filename as the source 
          of commands
       -l
          List all available databases
       -U username
          Connect to the database as the user username

Kilka użytecznych poleceń terminala PostgreSQL.

    wbzyl=> \du
    wbzyl=> \l
    wbzyl=> \dp
    wbzyl=> \d nazwa_tabeli


## Tabelki użyte w przykładach

Pomijam tabelki *t1* oraz *t10*.

### Tabelka EMP

    empno  ename    job         mgr    hiredate     sal    comm  deptno
    --------------------------------------------------------------------
    7369 | smith  | clerk     | 7902 | 1980-12-17 |  800 |      |     20
    7499 | allen  | salesman  | 7698 | 1981-02-20 | 1600 |  300 |     30
    7521 | ward   | salesman  | 7698 | 1981-02-22 | 1250 |  500 |     30
    7566 | jones  | manager   | 7839 | 1981-04-02 | 2975 |      |     20
    7654 | martin | salesman  | 7698 | 1981-09-28 | 1250 | 1400 |     30
    7698 | blake  | manager   | 7839 | 1981-05-01 | 2850 |      |     30
    7782 | clark  | manager   | 7839 | 1981-06-09 | 2450 |      |     30
    7788 | scott  | analyst   | 7566 | 1982-12-09 | 3000 |      |     20
    7839 | king   | president |      | 1981-11-17 | 5000 |      |     10
    7844 | turner | salesman  | 7698 | 1981-09-08 | 1500 |    0 |     30
    7867 | adams  | clerk     | 7788 | 1983-01-12 | 1100 |      |     20
    7900 | james  | clerk     | 7698 | 1981-12-03 |  950 |      |     30
    7902 | ford   | analyst   | 7566 | 1981-12-03 | 3000 |      |     20
    7934 | miller | clerk     | 7782 | 1982-01-23 | 1300 |      |     10

### Tabelka DEPT

    deptno  dname        loc
    -------------------------------
       10 | accounting | new york
       20 | research   | dallas
       30 | sales      | chicago
       40 | operations | boston


Pliki z danymi pobieramy z repozytorium git:

    git clone git://manta.univ.gda.pl/~wbzyl/cookbook
