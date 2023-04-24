//  Importamos mongoose
const mongoose = require("mongoose");
//  Nos conectamos a la BBDD
const { connect } = require("../db.js");
// Importamos el modelo
const { Book } = require("../models/Book.js");
//
const bookList = [
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 543,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
  },
];
//  Cuando nos conectemos ...
connect().then(() => {
  console.log("Tenemos conexión");
  // Elimina los datos previos
  Book.collection.drop().then(() => {
    console.log("Usuarios eliminados");

    //  Añadimos los libros
    const documents = bookList.map((user) => new Book(user));
    Book.insertMany(documents) // Insertamos nuestros documentos
      .then(() => console.log("Datos guardados correctamente!")) // Si ha ido bien imprimo por consola
      .catch((error) => console.error(error)) // Si hay error imprimo error
      .finally(() => mongoose.disconnect()); // Cierro la conexion
  });
});
