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
-- common table expression (CTE)
with tags as (
	select user_id, created_at from caption_tags
	union all -- must be the same columns
	select user_id, created_at from photo_tag
)
select username,tags.created_at
from users
join tags on tags.user_id = user.id
where tags.created_at < '2010-01-07'
/*
   Recursive CTE
   - must have
     1- initial query / non-recursive query (above the union)
     2- a union
     3- recursive query (below the union)
   - how it work
     1- define the results and working table(the column would be the argument of table name)
     2- run the initial non-recursive statement and put the result into the results and the working tables
     3- run the recursive statement and replacing table name 'countdown' with the working table
     4- if the recursive state returns some rows, append them to the results table and run recursive again
     5- if recursive statement return no rows stop the recursion 
*/
with recursive countdown(val) as (
		select 3 as val
	union
		select val - 1 from countdown where val > 1
)
select * from countdown -- output 3 2 1
-- using Recursive CTE to query suggestion users depend on who the user's friends are follow
with recursive suggestion(leader_id, follower_id, depth) as (
		select leader_id, follower_id , 1 as depth
		from followers where follower_id = 1
	union
		select followers.leader_id , followers.followers, depth+1
		from followers
		join suggestion on suggestion.leader_id = followers.follower_id
		where depth < 2
)
select distinct users.id, users.username
from suggestion 
join users on users.id = suggestion.leader_id
where depth > 1 -- beacuse 1 is the friend we make suggest on
limit 50
-- view : create a fake table that has rows from other table
create view tags as (
	select id, created_at , user_id, post_id, 'photo_tag' as type from photo_tags
	union all
	select id, created_at , user_id, post_id, 'caption_tag' as type from caption_tags
);

select * from tags;
-- edit or create view
create or replace view recent_posts as(
	select * 
	from posts 
	order by created_at 
	desc limit 50
)
-- to delete view
drop view recent_posts
-- materialize view : it trigger when database open and cache the rows
-- use it to calculate some heavey values that not often changes
create materialize view weekely_likes as (
	select 
		data_trunc('week', coalesce(posts.created_at, comments.created_at)) as week , 
		count(posts.id) as num_likes_for_posts,
		count(comments.id) as num_likes_for_comments
	from likes
	left join posts on posts.id = likes.post_id
	left join comments on comments.id = likes.comment_id
) with data;
-- to refresh materialize view
refresh materialize view  weekely_likes;
