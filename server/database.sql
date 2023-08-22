CREATE DATABASE weblog;

CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR,
    user_password VARCHAR,
    subscription BOOLEAN,
);

CREATE TABLE admin(
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR,
    admin_password VARCHAR,
    activation_key VARCHAR
);