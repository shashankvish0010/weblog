CREATE DATABASE weblog;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(30),
    user_password VARCHAR,
    confirm_password VARCHAR
);