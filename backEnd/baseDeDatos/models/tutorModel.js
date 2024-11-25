//codigo encargado de gestionar los datos con la base de datos de los alumnos
require('rootpath')();
const db = require('config/config_database');
//const router = require('../controllers/tutorController');


const Tutor = {

    listarTodo: async () => {
        try {
            const query = 'SELECT * FROM tutor';
            const [rows] = await db.execute(query);
            return rows.map(row => ({ 
                id_tutor: row.id_tutor, 
                telefono: row.telefono, 
                direccion: row.direccion,
                fk_usuario: row.fk_usuario     
            }));
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
                FROM usuario u
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
    
    
    modificarTutor: async (id_tutor, direccion, telefono) => {
        const query = 'UPDATE tutor SET direccion = ?, telefono = ? WHERE id_tutor = ?';
        //console.log(result(query));
        try {
            const result = await db.execute(query, [id_tutor, direccion, telefono]);
            if (result.affectedRows === 0) {
                const error = new Error(`No se pudieron modificar los datos del tutor con el ID: ${id_tutor}`);
                error.statusCode = 404;
                throw error;
            }
           // if (direccion === undefined || telefono === undefined || id_tutor === undefined) {
              //  return res.status(400).json({ message: 'Faltan parámetros requeridos (direccion, telefono, id_tutor)' });
          //  }else 
            {return { message: "tutor actualizado con exito", detail: result };}

        } catch (error) {
            throw new Error('Error al actualizar el tutor: ' + error.message);
        }
    },

    eliminarTutor: async (id_tutor) => {
        try {
            const query = 'DELETE FROM tutor WHERE id_tutor = ?';
            const result = await db.execute(query, [id_tutor]);

            if (result.affectedRows === 0) {
                const error = new Error(`No se encontro al tutor con ID: ${id_tutor}`);
                error.statusCode = 404;
                throw error;
            }

            return { message: "Tutor eliminado con exito", detail: result }

        } catch (error) {
            throw new Error('Error al eliminar el tutor: ' + error.message);
        }
    }
};

module.exports = Tutor;
