const express = require('express');
const router = express.Router();
const autoresController = require("../controllers/autoresController");

// Obtener todos los autores
router.get("/", autoresController.obtenerAutores);

// Crear un nuevo autor
router.post("/", autoresController.crearAutor);

// Actualizar un autor existente
router.put("/:id", autoresController.actualizarAutor);

// Eliminar autores seleccionados
router.delete("/", autoresController.eliminarAutores);

module.exports = router;

