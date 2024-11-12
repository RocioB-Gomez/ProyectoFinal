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
const configuracion = require("./config.json");

// Importar controlador de alumnos
const alumnoController = require("./controllers/alumnoController.js");
app.use("/api/alumno", alumnoController);  // Usar el router de alumnoController

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
