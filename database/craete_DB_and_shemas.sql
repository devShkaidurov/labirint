create database if not exists DBMaze;
use DBMaze;
create table if not exists Users 
(
	login varchar(100) primary key not null, 
	pass varchar(100) not null, 
	isAdmin tinyint(1) not null
);

create table if not exists Mazes
(
    mazeName varchar(50) primary key not null,
    creationTime datetime not null,
    structure JSON not null
);

#insert Users(login, pass, isAdmin) values ("admin", "admin", 1);