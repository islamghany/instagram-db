-- to create an index
create index on users(username);
-- to remove an index
drop index users_username_idx;
-- to know amount of time query take to get data
explain analyze select *
from users
where username = 'islam'; -- execution time
-- to know the size of the heap file(table)
select pg_size_pretty(pg_relation_size('users'));
/* 
   postgres by default make index to(pk, unique constraint)
   to show all indecies in the DB
*/
select relname,relkind
from pg_class
where relkind = 'i';
