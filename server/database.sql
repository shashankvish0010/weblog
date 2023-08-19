CREATE DATABASE weblog;

CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR,
    user_password VARCHAR
);