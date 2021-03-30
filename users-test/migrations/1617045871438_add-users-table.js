/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    create table users(
      id serial primary key,
      created_at timestamp with time zone default current_timestamp,
      updated_at timestamp with time zone default current_timestamp,
      bio varchar(300),
      username varchar(30)
    )
  `)
};

exports.down = pgm => {
  pgm.sql(`
    drop table users;
  `)
};
