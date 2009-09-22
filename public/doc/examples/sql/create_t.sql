-- 11.03.2009

-- pivot tables 

create table t1
(
  id int
);

create table t10
(
  id int
);

create table dept
(
  deptno int primary key,
  dname varchar(16),
  loc varchar(16)
);

create table emp 
(
  empno int primary key,
  ename varchar(16),
  job varchar(16),
  mgr int,
  hiredate date,
  sal int,
  comm int,
  deptno int,
  constraint deptno_fk foreign key (deptno) references dept(deptno)
);

-- create index dept_key on dept(deptno);
-- create index emp_key on emp(empno);