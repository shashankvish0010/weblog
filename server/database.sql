CREATE DATABASE weblog;

CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR,
    user_password VARCHAR,
    subscription BOOLEAN,
    account_verified BOOLEAN
);

CREATE TABLE admin(
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR,
    lastname VARCHAR,
    email VARCHAR,
    admin_password VARCHAR,
    activation_key VARCHAR
);

CREATE TABLE blogposts(
    id VARCHAR PRIMARY KEY,
    writer_firstname VARCHAR,
    writer_lastname VARCHAR,
    writer_email VARCHAR,
    blog_title VARCHAR,
    blog_image VARCHAR,
    blog_description VARCHAR,
    blog_keywords VARCHAR,
    public_view BOOLEAN,
    meta_description VARCHAR
);