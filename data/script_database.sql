create database 'smart-brain'


CREATE TABLE USERS (
    id serial PRIMARY key,
    name varchar(150),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
joined TIMESTAMP NOT NULL
);


CREATE TABLE login (
   id serial PRIMARY key,
   hash VARCHAR(100) NOT null,
   email text UNIQUE NOT NULL 
);
