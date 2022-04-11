drop database if exists friendless-in-seattle;
create database friendless-in-seattle;


CREATE TABLE user (
    id INT NOT NULL ATUO_INCREMENT,
    user_name VARCHAR(30) NOT NULL,
    about VARCHAR(500) NOT NULL,
    location VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE posts (
    id INT NOT NULL ATUO_INCREMENT,
    user_id INT NOT NULL,
    post_content VARCHAR(1000) NOT NULL,
    _created TIMESTAMP Default NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE Comments (
    id INT ATUO_INCREMENT NOT NULL,
    title VARCHAR(75) NOT NULL,
    content TEXT NOT Null,
    _created TIMESTAMP Default NOW(),
    PRIMARY KEy (id),
    FOREIGN KEY (Postsid) REFERNCES posts (id),

)