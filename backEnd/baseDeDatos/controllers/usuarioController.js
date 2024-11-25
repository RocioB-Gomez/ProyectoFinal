const express = require('express');
const router = express.Router();
const model = require('../models/usuarioModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { rulesUser, validate } = require('../middleware/validations.js');

// ----------------------------------------------------------
// -- Rutas de escucha (endpoint) disponibles para USUARIO --
// ----------------------------------------------------------

router.post('/login', login);
router.post('/', rulesUser(), validate, crearUsuario);
router.get('/', listarUsuario);
router.get('/rol/:rol', listarRol);
router.put('/:id_usuario', actualizarUsuario);
router.delete('/:id_usuario', eliminarUsuario);

//  
// -- funciones utilizadas por el router  ----------------------- 
// --------------------------------------------------------------


async function login(req, res) {
    try {
        const { mail, contraseña } = req.body;
        const result = await model.buscarPorMail(mail);
        const iguales = bcrypt.compare(contraseña, result.contraseña);
        if (iguales) {
            let user = {
                nombre: result.nombre,
                apellido: result.apellido,
                mail: result.mail,
                rol: result.rol
            }
            jwt.sign(user, 'secretPass', { expiresIn: '10000s' }, (err, token) => {
                if (err) {
                    res.status(500).send({ message: err });
                } else {
                    res.status(200).json({ datos: user, token: token });
                }
            })
        } else {
            res.status(403).send({ message: 'Contraseña Incorrecta' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function crearUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { mail, contraseña, nombre, apellido, rol } = req.body;
    
    // Validación básica
    if (!mail || !contraseña || !nombre || !apellido || !rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validación adicional para el campo "rol" (opcional)
    const rolesPermitidos = ['Tutor', 'Docente', 'Institucion'];
    
    if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ error: 'El rol proporcionado no es válido' });
    }
        try {
            const result = await model.crearUsuario(mail, contraseña, nombre, apellido, rol);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
}

async function listarUsuario(req, res) {
    try {
        const results = await model.listarUsuario();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function listarRol(req, res) {
    const { rol } = req.params;
    try {
        const usuarios = await model.listarRol(rol);
        console.log('Rol recibido:', rol);
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function actualizarUsuario(req, res) {
    const { id_usuario } = req.params;
    const { mail, contraseña, nombre, apellido, rol } = req.body;
    try {
        await model.actualizarUsuario (id_usuario, mail, contraseña, nombre, apellido, rol,);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
        await model.eliminarUsuario(id_usuario);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



module.exports = router;


