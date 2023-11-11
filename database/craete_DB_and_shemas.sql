create database if not exists DBMaze;
use DBMaze;
create table if not exists Users 
(
	login varchar(100) primary key not null, 
	pass varchar(100) not null, 
	isAdmin tinyint(1) not null
);

#insert Users(login, pass, isAdmin) values ();