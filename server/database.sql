CREATE DATABASE shelterdb;

CREATE TABLE favorites(
    favorite_id SERIAL PRIMARY KEY,
    dog_id TEXT NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users (user_id)
);

CREATE TABLE users(
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(50)
);