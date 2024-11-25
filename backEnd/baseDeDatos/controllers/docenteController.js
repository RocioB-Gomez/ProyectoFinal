// docenteController.js

const express = require('express');
const router = express.Router();
const Docente = require('../models/docenteModel');



// Obtener todos los docentes (paginados)
router.get('/', async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    try {
        const docentes = await Docente.listarDocente(parseInt(page), parseInt(pageSize));
        res.status(200).json({ detail: docentes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un docente por mail
router.get('/:mail', async (req, res) => {
    const { mail } = req.params;
    try {
        const docente = await Docente.obtenerDocentePorMail(mail);
        if (docente.length === 0) {
            return res.status(404).json({ message: `Docente no encontrado con el mail ${mail}` });
        }
        res.json(docente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Modificar un docente
router.put('/modificarDocente/:id_docente', async (req, res) => {
    var { id_docente } = req.params;
    var {especialidad } = req.body;
    try {
        const result = await Docente.modificarDocente(id_docente, especialidad);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
