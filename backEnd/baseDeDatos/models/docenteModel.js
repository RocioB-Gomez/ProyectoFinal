require('rootpath')();
const db = require('config/config_database');

const Docente = {
    

    //router.get('/')
    listarDocente: async (page = 1, pageSize = 10) => {
        const offset = (page - 1) * pageSize;
        const query = `
            SELECT 
                d.id_docente, 
                u.mail, 
                u.nombre, 
                u.apellido, 
                d.especialidad
            FROM usuario u 
            INNER JOIN docente d ON u.id_usuario = d.fk_usuario
            LIMIT ? OFFSET ?`;
        try {
            const [rows] = await db.execute(query, [pageSize, offset]);
            return rows; // Devuelve las filas obtenidas
        } catch (error) {
            throw new Error('Error al listar docentes: ' + error.message);
        }
    },

    //router.get('/:mail')
    obtenerDocentePorMail: async (mail) => {
        const query = `SELECT 
        d.id_docente, 
        u.mail, 
        u.nombre, 
        u.apellido, 
        d.especialidad
        FROM usuario u 
        INNER JOIN docente d 
        ON u.id_usuario = d.fk_usuario 
        WHERE u.mail = ?`;
        try {
            const [rows] = await db.execute(query, [mail]); // Ejecuta el query con el parámetro
            return rows; // Devuelve las filas obtenidas
        } catch (error) {
            throw new Error(`Error al obtener docente con el mail: ${mail}` + error.message);
        }
    },



    //router.put('/modificarDocente/:id_docente')
    modificarDocente: async (id_docente, especialidad) => {
        const query = 'UPDATE docente SET especialidad = ? WHERE id_docente = ?';
        try {
            const result = await db.execute(query, [especialidad, id_docente]);
            if (result.affectedRows === 0) {
                throw new Error(`Docente con ID ${id_docente} no encontrado`);
            }
            return { message: "Docente actualizado correctamente" };
        } catch (error) {
            throw new Error('Error al actualizar docente: ' + error.message);
        }
    }
};
module.exports = Docente;
