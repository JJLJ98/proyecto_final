const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  premios: { type: [String], default: [] },
  fechaFallecimiento: { type: Date, default: null }
});

module.exports = mongoose.model('Autor', AutorSchema);
