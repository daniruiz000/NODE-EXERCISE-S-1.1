//  Importamos mongoose
const mongoose = require("mongoose");
//  Nos conectamos a la BBDD
const { connect } = require("../db.js");
// Importamos el modelo
const { Book } = require("../models/Book.js");

// Importamos la librería faker:
const { faker } = require("@faker-js/faker");

// Creamos 50 books aleatoriamente y los vamos añadiendo al array de books:
const bookList = [];

for (let i = 0; i < 50; i++) {
  const newBook = {
    title: faker.random.words(3),
    author: faker.name.fullName(),
    pages: faker.datatype.number({ min: 50, max: 1000 }),
    publisher: {
      name: faker.company.name(),
      country: faker.address.country(),
    },
  };

  // Añadimos el book a nuestra array de books:
  bookList.push(newBook);
}
//  Cuando nos conectemos ...
connect().then(() => {
  console.log("Tenemos conexión");
  // Elimina los datos previos
  Book.collection.drop().then(() => {
    console.log("Books eliminados");

    //  Añadimos los libros
    const documents = bookList.map((book) => new Book(book));
    Book.insertMany(documents) // Insertamos nuestros documentos
      .then(() => console.log("Datos guardados correctamente!")) // Si ha ido bien imprimo por consola
      .catch((error) => console.error(error)) // Si hay error imprimo error
      .finally(() => mongoose.disconnect()); // Cierro la conexion
  });
});
