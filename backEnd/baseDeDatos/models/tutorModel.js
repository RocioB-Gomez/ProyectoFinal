//codigo encargado de gestionar los datos con la base de datos de los alumnos
require('rootpath')();
const db = require('../config/config_database');
//const router = require('../controllers/tutorController');


const Tutor = {

    listarTodo: async () => {
        try {
            const query = 'SELECT * FROM tutor';
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener la lista de Tutores: ' + error.message);
        }
    },
    
    obtenerPorMail: async (mail) => {
        try {
            const consulta = `
                SELECT 
                    u.mail, 
                    u.nombre, 
                    u.apellido, 
                    t.direccion, 
                    t.telefono
                FROM USUARIOS u
                INNER JOIN tutor t 
                ON u.id_usuario = t.fk_usuario
                WHERE u.mail = ?`;
    
            const [rows] = await db.execute(consulta, [mail]);
            
            console.log('Filas devueltas:', rows);
    
            if (rows.length === 0) {
                throw new Error(`No se encontraron tutores con el mail: ${mail}`);
            }
    
            return rows;
        } catch (error) {
            console.error('Error ejecutando la consulta:', error.message);
            throw new Error(`Error al buscar tutor por mail: ${error.message}`);
        }
    },
    
    obtenerAlumno: async (dni) => {
        const query = 'SELECT * FROM alumno WHERE dni = ?';
        try {
            const [rows] = await db.execute(query, [dni]);
            return rows;
        } catch (error) {
            throw new Error('No existe ningun alumno con ese DNI: ' + error.message);
        }
    },
    modificarAlumno: async (dni, anio_ingreso, nombre, apellido, curso) => {
        const query = 'UPDATE alumno SET anio_ingreso = ?, nombre = ?, apellido = ?, curso = ? WHERE dni = ?';
        try {
            const result = await db.execute(query, [dni, anio_ingreso, nombre, apellido, curso]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se pudieron modificar los datos del alumno con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }
            return { message: "Alumno actualizado con exito", detail: result };
        } catch (error) {
            throw new Error('Error al actualizar al alumno: ' + error.message);
        }
    },

    eliminarAlumno: async (dni) => {
        try {
            const query = 'DELETE FROM alumno WHERE dni = ?';
            const result = await db.execute(query, [dni]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro al alumno con el DNI: ${dni}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Alumno eliminado con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar al alumno: ' + error.message);
        }
    }
};

module.exports = Tutor;
