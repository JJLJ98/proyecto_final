// routes/libros.js
const express = require("express");
const router = express.Router();
const librosController = require("../controllers/librosController");

router.get("/", librosController.obtenerLibros);
router.post("/", librosController.crearLibro);
router.put("/:id", librosController.actualizarLibro);
router.delete("/", librosController.eliminarLibros);

module.exports = router;
