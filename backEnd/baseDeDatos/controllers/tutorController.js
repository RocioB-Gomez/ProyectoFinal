// tutorController.js

const express = require('express');
const router = express.Router();
const model = require('../models/tutorModel.js');


// -------------------------------------------------------- 
// --rutas de escucha (endpoint) disponibles para TUTOR --- 
// --------------------------------------------------------

router.get("/", listarTodo);
router.get('/:mail', obtenerPorMail);
router.put("/:id_tutor", modificarTutor);
router.delete("/:id_tutor", eliminarTutor);


// --------------------------------------------------------
// --------- FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// -------------------------------------------------------

async function listarTodo(req, res) {
    try {
        const results = await model.listarTodo();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function obtenerPorMail(req, res) {
    const { mail } = req.params;
    console.log('Mail recibido:', mail); // Verifica si el parámetro mail llega al controlador
    try {
        const results = await model.obtenerPorMail(mail);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No existe un Tutor con ese mail' });
        }
        console.log('Tutor encontrado:', results[0]);
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



async function modificarTutor(req, res) {
    const { id_tutor } = req.params;
    let {direccion, telefono } = req.body;
    try {
        await model.modificarTutor(id_tutor, direccion, telefono);
        res.status(200).json({ message: 'Tutor actualizado correctamente' });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).send(error.message);
    }
}

async function eliminarTutor(req, res) {
    const { id_tutor } = req.params;
    try {
        const result = await model.eliminarTutor(id_tutor);

        res.status(200).json({ message: 'Tutor eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports = router;
