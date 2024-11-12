//codigo encargado de gestionar los datos con la base de datos de los alumnos
require('rootpath')();

const mysql = require("mysql");
const configuracion = require("config.json");
const { query } = require('express');
// Agregue las credenciales para acceder a su base de datos
const connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err.code);
    } else {
        console.log("BD conectada");
    }
});

var metodos = {}

// --> app.get("/", listarTodo());  --> alumnos = alumnoBD.getAll((err, result) => {}
metodos.getAll = function (callback) {
    consulta = "select * from alumno";
    connection.query(consulta, function (err, resultados, fields) {
        if (err) {
            callback(err);
            return;
        } else {
            callback(undefined, {
                messaje: "Resultados de la consulta",
                detail: resultados,
            });
        }
    });
}

// --> app.get('/:dni', obtenerAlumno);  -->  alumnoBD.getAlumno(dni, () => {})
metodos.getAlumno = function (dni, callback) {
    consulta = "select * from alumno where dni= ?";

    connection.query(consulta, dni, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontro un alumno con el dni:" + dni)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta",
                    detail: resultados,
                });
            }
        }

    });

}
metodos.getByCurso = function (curso, callback) {
    consulta = "select * from alumno where curso = ?";

    connection.query(consulta, curso, function (err, resultados, fields) {
        if (err) {
            callback(err);
        } else {
            if (resultados.length == 0) {
                callback(undefined, "no se encontró un alumno en el curso:" + curso)
            } else {
                callback(undefined, {
                    messaje: "Resultados de la consulta en el curso" + curso,
                    detail: resultados,
                });
            }
        }

    });

}

//--> app.put("/:dni", modificarAlumno);  --> function modificarAlumno(req, res) {}

metodos.update = function (datosAlumno, deTalAlumno, callback) {

    datos = [
        datosAlumno.id_alumno,
        datosAlumno.dni,
        datosAlumno.anio_ingreso,
        datosAlumno.nombre,
        datosAlumno.apellido,
        datosAlumno.curso,
        datosAlumno.fk_usuario,
        datosAlumno.fk_tutor,
        parseInt(deTalAlumno)
    ];
    consulta = "update alumno set  id_alumno = ?, dni = ?, anio_ingreso = ?, nombre = ?, apellido = ?, curso = ?, fk_usuario = ?, fk_tutor = ?  WHERE dni = ?";


    connection.query(consulta, datos, (err, rows) => {
        if (err) {
            callback(err);
        } else {

            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message:
                        `no se enocntró un alumno con el dni  ${deTalAlumno}`,
                    detail: rows,
                })
            } else {
                callback(undefined, {
                    message:
                        `el alumno ${datosAlumno.nombre +  datosAlumno.apellido} se actualizó correctamente`,
                    detail: rows,
                })
            }

        }
    });


}

//--> alumnoBD.metodos.crearAlumno(req.body, (err, exito) => {});
metodos.crearAlumno = function (datosAlumno, callback) {
    // Asegúrate de incluir el valor de fk_usuario (id_usuario)
    let alumno = [
        datosAlumno.dni,
        datosAlumno.anio_ingreso,
        datosAlumno.nombre,
        datosAlumno.apellido,
        datosAlumno.curso,
        datosAlumno.fk_usuario,
        datosAlumno.fk_tutor
    ];

    let consulta = "INSERT INTO ALUMNO (dni, anio_ingreso, nombre, apellido, curso, fk_usuario, fk_tutor) VALUES (?, ?, ?, ?, ?, ?, ?)";

    connection.query(consulta, alumno, (err, rows) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                callback({
                    message: "Ya existe un alumno con el DNI " + datosAlumno.dni,
                    detail: err.sqlMessage
                });
            } else {
                callback({
                    message: "Ha ocurrido un error al intentar registrar al alumno.",
                    detail: err.sqlMessage
                });
            }
        } else {
            callback(undefined, {
                message: "El alumno con DNI " + datosAlumno.dni + " se registró correctamente.",
                detail: rows,
            });
        }
    });
}


metodos.deleteAlumno = function (id_alumno, callback) {
    consulta = "delete from alumno where id_alumno = ?";
    connection.query(consulta, id_alumno, function (err, rows, fields) {
        if (err) {
            callback({
                message: "ha ocurrido un error",
                detail: err,
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontró un paciente con el número de historial clinico " + id_alumno);
        } else {
            callback(undefined, "el alumno " + id_alumno + " fue eliminado de la Base de datos");
        }
    });
}



module.exports = { metodos }



