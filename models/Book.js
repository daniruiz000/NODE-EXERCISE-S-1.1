//  Importamos Mongoose
const mongoose = require("mongoose");
// Declaramos nuestro esquema que nos permite declarar nuestros objetos y crearle restricciones.
const Schema = mongoose.Schema;
// Creamos esquema del book
const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: false },
    //
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);
// Creamos un modelo parea que siempre que creamos un book valide contra el Schema que le hemos creado para ver si es valido.
const Book = mongoose.model("Book", bookSchema);
//  Exportamos para poder usarlo fuera
module.exports = { Book };
