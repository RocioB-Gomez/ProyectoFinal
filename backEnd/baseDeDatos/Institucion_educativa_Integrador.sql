CREATE DATABASE integrador;
-- drop database integrador;
USE integrador;

CREATE TABLE institucion (
    id_institucion INT(11) PRIMARY KEY NOT NULL,
    nombre VARCHAR(50) NOT NULL,       -- Ampliado tamaño
    telefono VARCHAR(30) NOT NULL,
    domicilio VARCHAR(100) NOT NULL    -- Ampliado tamaño
);

CREATE TABLE usuario (
    id_usuario INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mail VARCHAR(50) NOT NULL,         -- Ampliado tamaño
    contraseña VARCHAR(50) NOT NULL,   -- Ampliado tamaño
    nombre VARCHAR(50) NOT NULL,       -- Ampliado tamaño
    apellido VARCHAR(50) NOT NULL,     -- Ampliado tamaño
    rol ENUM('Tutor', 'Docente', 'Institucion') NOT NULL
);

CREATE TABLE area_curricular (
    id_area INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,       -- Ampliado tamaño
    fk_institucion INT(11) NOT NULL,
    FOREIGN KEY (fk_institucion) REFERENCES institucion(id_institucion)
);

CREATE TABLE docente (
    id_docente INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,       -- Ampliado tamaño
    apellido VARCHAR(50) NOT NULL,     -- Ampliado tamaño
    especialidad VARCHAR(50) NOT NULL, -- Ampliado tamaño
    fk_usuario INT(11) NOT NULL,
    fk_institucion INT(11) NOT NULL, 
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_institucion) REFERENCES institucion(id_institucion)
);

CREATE TABLE asignatura (
    id_asignatura INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,       -- Ampliado tamaño
    fk_area INT(11) NOT NULL,
    fk_docente INT(11) NOT NULL,
    FOREIGN KEY (fk_area) REFERENCES area_curricular(id_area),
    FOREIGN KEY (fk_docente) REFERENCES docente(id_docente)
);

CREATE TABLE tutor (
    id_tutor INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,       -- Ampliado tamaño
    apellido VARCHAR(50) NOT NULL,     -- Ampliado tamaño
    direccion VARCHAR(100) NOT NULL,   -- Ampliado tamaño
    telefono VARCHAR(30) NOT NULL,
    fk_usuario INT(11) NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE alumno (
    id_alumno INT(11) PRIMARY KEY AUTO_INCREMENT,
    dni INT(11) NOT NULL,
    anio_ingreso INT(4) NOT NULL,
    nombre VARCHAR(50) NOT NULL,       -- Ampliado tamaño
    apellido VARCHAR(50) NOT NULL,     -- Ampliado tamaño
    curso VARCHAR(11) NOT NULL,        -- Tamaño adecuado, puede ampliarse si es necesario
    fk_usuario INT(11) NOT NULL,
    fk_tutor INT(11) NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_tutor) REFERENCES tutor(id_tutor)
);

CREATE TABLE calificacion (
    id_calificacion INT(11) PRIMARY KEY AUTO_INCREMENT,
    fk_alumno INT(11) NOT NULL,
    fk_asignatura INT(11) NOT NULL,
    nota DECIMAL(5, 2) NOT NULL,       -- Cambio para tener dos decimales (ej. 7.50)
    FOREIGN KEY (fk_alumno) REFERENCES alumno(id_alumno),
    FOREIGN KEY (fk_asignatura) REFERENCES asignatura(id_asignatura)
);

