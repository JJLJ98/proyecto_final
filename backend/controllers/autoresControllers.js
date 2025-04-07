// controllers/autoresController.js
const Autor = require("../models/Autor");

// Obtener todos los autores
exports.obtenerAutores = async (req, res) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener autores", error });
  }
};

// Crear un nuevo autor
exports.crearAutor = async (req, res) => {
  try {
    const nuevoAutor = new Autor(req.body);
    await nuevoAutor.save();
    res.status(201).json(nuevoAutor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear autor", error });
  }
};

// Actualizar un autor existente
exports.actualizarAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const autorActualizado = await Autor.findByIdAndUpdate(id, req.body, { new: true });
    res.json(autorActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar autor", error });
  }
};

// Eliminar autores seleccionados (por ID)
exports.eliminarAutores = async (req, res) => {
  try {
    const { ids } = req.body;
    await Autor.deleteMany({ _id: { $in: ids } });
    res.json({ mensaje: "Autores eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar autores", error });
  }
};
