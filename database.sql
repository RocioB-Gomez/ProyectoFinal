CREATE DATABASE integrador;
drop database integrador;
use integrador;

create table institucion (
	id_institucion int(11) primary key not null,
    nombre varchar(30) not null,
    telefono varchar(30) not null,
    domicilio varchar(20) not null
);

create table usuario (
	id_usuario int(11) primary key auto_increment not null,
    contraseña varchar(30) not null,
    mail varchar(30) not null,
    nombre varchar(30) not null,
    apellido varchar(30) not null
);

create table area_curricular(
	id_area int(11) primary key auto_increment,
    nombre varchar(30) not null,
    id_institucion int(11) not null,
    foreign key (id_institucion) references institucion(id_institucion)
);

create table docente(
	id_docente int(11) primary key auto_increment,
    nombre_completo varchar(30) not null,
    especialidad varchar(30) not null,
    id_usuario int(11) not null,
    foreign key (id_usuario) references usuario(id_usuario)
);

create table asignatura(
	id_asignatura int(11) primary key auto_increment,
    nombre varchar(30) not null,
    id_area int(11) not null,
    id_docente int(11) not null,
    foreign key (id_area) references area_curricular(id_area),
    foreign key (id_docente) references docente(id_docente)
);

create table alumno(
	id_alumno int(11) primary key auto_increment,
    nombreCompleto varchar(30) not null,
    curso int(11) not null,
    division varchar(5) not null,
    id_usuario int(11) not null,
    foreign key (id_usuario) references usuario(id_usuario)
);

create table calificacion(
	id_calificacion int(11) primary key auto_increment,
    nota decimal(5) not null,
    id_alumno int(11) not null,
    id_usuario int(11) not null,
    foreign key (id_alumno) references alumno(id_alumno),
    foreign key (id_usuario) references usuario(id_usuario)
);

create table tutor(
id_tutor int(11) primary key auto_increment,
nombreCompleto varchar(30) not null,
telefono varchar(30) not null
)