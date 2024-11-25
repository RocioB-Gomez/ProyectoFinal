// app.js

const express = require('express');
const app = express();
const morgan = require("morgan");

// Middleware para procesar JSON y formularios URL codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura morgan para registrar solicitudes HTTP con formato personalizado
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

// Cargar configuración desde el archivo config.json
const configuracion = require("./config/config.json");

// Importar controlador de alumnos
const alumnoController = require("./controllers/alumnoController.js");
app.use("/api/alumno", alumnoController);  // Usar el router de alumnoController

// Importar controlador de usuario
const usuarioController = require("./controllers/usuarioController.js");
app.use("/api/usuario", usuarioController);  // Usar el router de usuarioController

// Importar controlador de tutores
const tutorController = require("./controllers/tutorController.js");
app.use("/api/tutor", tutorController);  // Usar el router de tutorController

// Importar controlador de docentes
const docenteController = require("./controllers/docenteController.js");
app.use("/api/docente", docenteController);  // Usar el router de docenteController

// Página de inicio
app.get("/", (req, res) => {
  res.send("Hola soy la página de inicio");
});

// Iniciar servidor
app.listen(configuracion.server.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Servidor encendido y escuchando en el puerto " + configuracion.server.port);
  }
});
