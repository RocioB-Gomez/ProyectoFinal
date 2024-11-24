const db = require('../config/config_database');
const bcrypt = require('bcrypt');


const Usuario = {

    //registrarse como usuario
    crear_usuario: async (mail, contraseña, nombre, apellido) => {
        const hashedPass = await bcrypt.hash(contraseña, 10); // Hasheamos la contraseña y reemplazamos pass por hashedPass
        //let textoHashed = bcrypt.hashSync("texto a encriptar",10);
        try {
            const params = [mail, hashedPass, nombre, apellido];
            const consulta = 'INSERT INTO usuario (mail, contraseña, nombre, apellido) VALUES (?, ?, ?, ?)';
            const result = await db.execute(consulta, params);
            return { message: `Usuario ${mail} creado con exito como ${rol}`, detail: result };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Existe un usuario con los mismos datos: ' + error.message);
            } else if (error.code === 'ER_BAD_NULL_ERROR') {
                throw new Error('La columna no puede ser nula: ' + error.message);
            } else if (error.code === 'ER_NO_REFERENCED_ROW') {
                throw new Error(' Falla en la restricción de clave externa.: ' + error.message);
            } else {
                throw new Error('No se pudo registrar al usuario debido a: ' + error.message);
            }
        }
    },

    //LISTAR USUARIOS

    listar_usuarios: async () => {
        const query = 'SELECT * FROM usuario';
        try {
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    },

    //LISTAR POR ROL

    listar_rol: async () => {
        const query = 'SELECT * FROM usuario WHERE rol = ?';
        try {
            const [rows] = await db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener usuarios por rol' + error.message);
        }
    },
    
    
    //un metodo que utiliza la funcion del login para saber si existe ese usuario o no

    buscarPorMail: async (mail) => {
        try {
            var [usuario] = await db.execute(
              'SELECT * FROM usuario WHERE mail = ?', [mail]);
            if (usuario.length === 0) {
                throw new Error(`Usuario no encontrado con el mail: ${mail}`);
            }
                return usuario;
            //     const { id_usuario, rol } = usuario[0];
            //     let query = '';
            //     let params = [id_usuario];
            //     switch (rol) {
            //     case 'Docente':
            //         query = ` SELECT d.especialidad FROM docente d WHERE d.fk_usuario = ?`;
            //         break;
            //     case 'Institucion':
            //         query = `SELECT i.telefono FROM institucion i WHERE i.fk_usuario = ? `;
            //         break;
            //     case 'Tutor':
            //         query = ` SELECT u.telefono, u.direccion FROM tutor u WHERE u.fk_usuario = ?`;
            //         break;
            //     default:
            //         throw new Error(`Rol no encontrado: ${rol}`);
            // }
            // const [resultRows] = await db.execute(query, params);
            //     if (resultRows.length === 0) {
            //         throw new Error(`Datos adicionales no encontrados: ${mail}`);
            //          // No se encontró información adicional
            //     }
                // return {
                // usuario,
                // nombre: resultRows[0].nombre
                // //pellido: resultRows[0].apellido
                // };
            } catch (err) {
                console.error('Error ejecutando la consulta:', err);
                throw err; // Re-lanzar el error para que el controlador lo maneje
            }
     },

//      buscarPorMail: async (mail) => { try { 
//         // Primera consulta para obtener el id_usuario 
//         const consulta = `SELECT id_usuario FROM usuario WHERE mail = ?`; 
//         const [result] = await db.execute(consulta, [mail]); 
//         if (result.length === 0) { throw new Error(`Usuario no encontrado con el mail: ${mail}`); } 
//         const id_usuario = result[0].id_usuario; 
        
//         // Segunda consulta utilizando el id_usuario obtenido 
        
//         const consulta2 = ` SELECT CONCAT(t.apellido, ' ', t.nombre) AS Apellido_y_Nombre_de_tutor 
//                             FROM tutor t WHERE t.fk_usuario = ? 
//                             UNION ALL SELECT CONCAT(d.apellido, ' ', d.nombre) AS Apellido_y_Nombre_de_docente 
//                             FROM docente d WHERE d.fk_usuario = ? 
//                             UNION ALL SELECT i.nombre AS Nombre_institucion 
//                             FROM institucion i WHERE i.fk_usuario = ?; `;

//         const [result2] = await db.execute(consulta2, [id_usuario, id_usuario, id_usuario]); 
//         return result2; // Devuelve el resultado de la segunda consulta 
//     } catch (error) {
//          throw new Error('Ha habido un error en la consulta: ' + error.message); }
//  },
     //BUSCAR POR ID

    buscarPorID: async (id) => {
        const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
        try {
            const [rows] = await db.execute(query, [id]);
            return rows;
        } catch (error) {
            throw new Error('Error al buscar el usuario: ' + error.message);
        }
    },

    //ACTUALIZAR USUARIO

    actualizar_usuario: async (id, contraseña, mail, nombre, apellido) => {
        const hashedPass = await bcrypt.hash(contraseña, 10);
        const query = 'UPDATE usuario SET contraseña = ?, mail = ?, nombre = ?, apellido = ? WHERE id_usuario = ?';
        try {
            await db.execute(query, [id, hashedPass, mail, nombre, apellido]);
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    },

    //BORRAR USUARIO

    eliminar_usuario: async (id) => {
        const query = 'DELETE FROM usuario WHERE id_usuario = ?';
        try {
            await db.execute(query, [id]);
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
};

module.exports = Usuario;


/*
const sql = 'SELECT * FROM persona WHERE dni = ?';
db.execute(sql, [dni], (err, results) => {
  if (err) throw err;
  console.log(results);
});
*/