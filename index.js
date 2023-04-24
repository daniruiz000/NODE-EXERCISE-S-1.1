// Importamos express
const express = require("express");
// Importamos el archivo de conexión a la BBDD
const { connect } = require("./db.js");
// Conexión a la base de datos
connect();
// Importamos el modelo que nos sirve tanto para importar datos como para leerlos
const { Book } = require("./models/Book.js");

//  Creamos router express
const PORT = 3000;
const server = express();
const router = express.Router();

//  Configuración del server
server.use(express.json()); // Sepa interpretar los JSON
server.use(express.urlencoded({ extended: false })); //  Sepa interpretar bien los parametros de las rutas

//  Rutas
router.get("/", (req, res) => {
  res.send("Esta es la Home de nuestra API");
});

//  Ruta para recuperar todos los libros
router.get("/book", (req, res) => {
  //  Con el ( modelo.find() ) leemos el modelo
  Book.find()
    .then((books) => res.json(books)) // Los devolvemos si funciona
    .catch((error) => res.status(500).json(error)); //  Devolvemos un codigo de error si falla
});

//  Ruta para recuperar un libri en concreto a través de su id ( modelo.findById())
router.get("/book/:id", (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then((book) => {
      if (book) {
        res.json(book); //  Si está el libro lo mandamos de respuesta en modo json
      } else {
        res.status(404).json({}); //    Si no existe el libro se manda un json vacio y un status 404
      }
    })
    .catch((error) => res.status(500).json(error)); //  Devolvemos un codigo de error si falla la lectura
});

//  Ruta para buscar un libro por el title ( modelo.findById({title: title}))
router.get("/book/title/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const book = await Book.find({ title: new RegExp("^" + title.toLowerCase(), "i") }); //  Busqueda que coincida el texto sin importar mayusc o minusc
    if (book?.length) {
      res.json(book); //  Si está el libro lo mandamos de respuesta en modo json
    } else {
      res.status(404).json([]); //   Si no existe el libro se manda un json vacio y un status 404
    }
  } catch (error) {
    res.status(500).json(error); //  Devolvemos un codigo de error si falla la lectura
  }
});

//  Ruta para añadir elementos
router.post("/book", async (req, res) => {
  try {
    const book = new Book({ title: req.body.title, author: req.body.author, pages: req.body.pages }); //     Un nuevo libro es un modelo de la BBDD que tiene un Scheme que valida esos datos
    const createdBook = await book.save(); // Guardamos el libro creado en caso de que vaya bien
    return res.status(201).json(createdBook); // 201 significa que algo se ha creado
  } catch (error) {
    res.status(500).json(error); //  Devolvemos un codigo de error si falla la escritura
  }
});

//  Decimos al server que utilice el router en la raíz
server.use("/", router);
//  Levantamos el server en el puerto indicado
server.listen(PORT, () => {
  console.log(`Server levantado en puerto ${PORT}`);
});
