// models/Libro.js
const mongoose = require("mongoose");

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "Autor", required: true },
  genero: { type: String, required: true },
  anioPublicacion: { type: Number, required: true },
  sinopsis: { type: String },
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model("Libro", libroSchema);
