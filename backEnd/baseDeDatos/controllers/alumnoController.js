// alumnoController.js

const express = require('express');
const router = express.Router(); // Usamos router en lugar de app
const alumnoBD = require("../models/alumnoModel.js");

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) disponibles para ALUMNO --- 
// --------------------------------------------------------

router.get("/", listarTodo);
router.get("/:curso", getByCurso);
router.post('/create', crear);
router.get('/:dni', obtenerAlumno);
router.delete("/:id_alumno", eliminarAlumno);
router.put("/:dni", modificarAlumno);

// --------------------------------------------------------
// --------- FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// --------------------------------------------------------

function getByCurso(req, res) {
    const curso = req.params.curso;
    alumnoBD.metodos.getByCurso(curso, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

function listarTodo(req, res) {
    alumnoBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

function crear(req, res) {
    alumnoBD.metodos.crearAlumno(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}

function obtenerAlumno(req, res) {
    const dni = req.params.dni;
    alumnoBD.metodos.getAlumno(dni, (err, exito) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(exito);
        }
    });
}

function modificarAlumno(req, res) {
    datosAlumno = req.body;
    deEsteAlumno = req.params.dni;
    alumnoBD.metodos.update(datosAlumno, deEsteAlumno, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(exito) //alumno modificado
        }
    });
}

function eliminarAlumno(req, res) {
    alumnoBD.metodos.deleteAlumno(req.params.id_alumno, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}


module.exports = router;
