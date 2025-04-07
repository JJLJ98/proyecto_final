// controllers/librosController.js
const Libro = require("../models/Libro");

// Obtener todos los libros
exports.obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find().populate("autor");
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener libros", error });
  }
};

// Crear un nuevo libro
exports.crearLibro = async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save();
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear libro", error });
  }
};

// Actualizar un libro existente
exports.actualizarLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const libroActualizado = await Libro.findByIdAndUpdate(id, req.body, { new: true });
    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar libro", error });
  }
};

// Eliminar libros seleccionados (por IDs)
exports.eliminarLibros = async (req, res) => {
  try {
    const { ids } = req.body;
    await Libro.deleteMany({ _id: { $in: ids } });
    res.json({ mensaje: "Libros eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar libros", error });
  }
};
