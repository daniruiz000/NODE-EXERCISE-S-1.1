// Importamos los modelos:
const { Book } = require("../models/Book");
const { Author } = require("../models/Author");

const { generateRandom } = require("../utils/generateRandom");

//  Función de relación entre de documentos de la colección.
const bookRelations = async () => {
  try {
    //  Recuperamos books y authors:
    const books = await Book.find();
    if (!books.length) {
      console.error("No hay libros en la BBDD.");
      return;
    }
    const author = await Author.find();
    if (!author.length) {
      console.error("No hay autores en la BBDD.");
      return;
    }

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const randomAuthor = author[generateRandom(0, author.length)];

      book.author = randomAuthor;

      await book.save();
    }
    console.log("Relaciones entre colecciones creadas correctamente");
  } catch (error) {
    //  Si hay error lanzamos el error por consola.
    console.error(error);
  }
};

module.exports = { bookRelations }; // Exportamos la función para poder usarla.
