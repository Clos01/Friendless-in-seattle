drop database if exists friendless-in-seattle;
create database friendless-in-seattle;


CREATE TABLE user (
    id INT NOT NULL ATUO_INCREMENT,
    user_name VARCHAR(30) NOT NULL,
    about VARCHAR(500) NOT NULL,
    location VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE posts (
    id INT NOT NULL ATUO_INCREMENT,
    user_id INT NOT NULL,
    post_content VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id)
);

