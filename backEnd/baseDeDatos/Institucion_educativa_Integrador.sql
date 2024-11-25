CREATE DATABASE integrador;
-- drop database integrador;
USE integrador;

CREATE TABLE institucion (
    id_institucion INT(11) PRIMARY KEY NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    domicilio VARCHAR(100) NOT NULL,    
    fk_usuario INT(11) NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE usuario (
    id_usuario INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mail VARCHAR(50) NOT NULL UNIQUE,         
    contraseña VARCHAR(250) NOT NULL,   
    nombre VARCHAR(50) NOT NULL,       
    apellido VARCHAR(50) NOT NULL,     
    rol ENUM('Tutor', 'Docente', 'Institucion') NOT NULL
    --router.post('/login', login);
    --router.post('/', rulesUser(), validate, crear_usuario);
    --router.get('/', listar_usuarios);
    --router.get('/rol', listar_rol);
    --router.get('/:usuario_id', buscarPorID);
    --router.put('/:usuario_id', actualizar_usuario);
    --router.delete('/:usuario_id', eliminar_usuario);

);

CREATE TABLE area_curricular (
    id_area INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,       
    fk_institucion INT(11) NOT NULL,
    FOREIGN KEY (fk_institucion) REFERENCES institucion(id_institucion)
);

CREATE TABLE docente (
    id_docente INT(11) PRIMARY KEY AUTO_INCREMENT,
    especialidad VARCHAR(50) NOT NULL, 
    fk_usuario INT(11) NOT NULL,
    fk_institucion INT(11) NOT NULL, 
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_institucion) REFERENCES institucion(id_institucion)
);

CREATE TABLE asignatura (
    id_asignatura INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,       
    fk_area INT(11) NOT NULL,
    fk_docente INT(11) NOT NULL,
    FOREIGN KEY (fk_area) REFERENCES area_curricular(id_area),
    FOREIGN KEY (fk_docente) REFERENCES docente(id_docente)
);

CREATE TABLE tutor (
    id_tutor INT(11) PRIMARY KEY AUTO_INCREMENT,
    direccion VARCHAR(50) NOT NULL,   
    telefono VARCHAR(30) NOT NULL,
    fk_usuario INT(11) NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
    --get("/", listarTodo);
    --get('/:dni', obtenerPorDNI);
    --put("/:dni", modificarTutor);
    --delete("/:dni", eliminarTutor);
);

CREATE TABLE alumno (
    id_alumno INT(11) PRIMARY KEY AUTO_INCREMENT,
    dni INT(11) NOT NULL,
    anio_ingreso INT(4) NOT NULL,
    nombre varchar(30) NOT NULL,
    apellido varchar(30) NOT NULL,
    curso VARCHAR(2) NOT NULL,     
    fk_tutor INT(11) NOT NULL,
    FOREIGN KEY (fk_tutor) REFERENCES tutor(id_tutor)
    --post('/crear', alumnoRules(), validate, crearAlumno);
    --get("/", listarTodo);
    --get("/:curso", obtenerPorCurso);
    --get('/:dni', obtenerAlumno);
    --put("/:dni", modificarAlumno);
    --delete("/:dni", eliminarAlumno);
);

CREATE TABLE calificacion (
    id_calificacion INT(11) PRIMARY KEY AUTO_INCREMENT,
    fk_alumno INT(11) NOT NULL,
    fk_asignatura INT(11) NOT NULL,
    nota DECIMAL(4, 2) NOT NULL,       -- Cambio para tener dos decimales, cuatro digitos en total, dos enteros dos decimales (ej. 7.50)
    FOREIGN KEY (fk_alumno) REFERENCES alumno(id_alumno),
    FOREIGN KEY (fk_asignatura) REFERENCES asignatura(id_asignatura)
);

