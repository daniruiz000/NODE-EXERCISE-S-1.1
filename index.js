// Importamos express.
const express = require("express");

// Importamos el bookRouter.
const { bookRouter } = require("./routes/book.routes"); //  LO IMPORTAMOS COMO UN OBJETO.
const { authorRouter } = require("./routes/author.routes"); //  LO IMPORTAMOS COMO UN OBJETO.

//  Función asíncrona que maneja nuestra API.
const main = async () => {
  // Conexión a la base de datos.
  const { connect } = require("./db.js"); // Importamos el archivo de conexión a la BBDD.
  const database = await connect(); //  Conectamos con la BBDD.

  //  Configuración del server.
  const PORT = 3000; //  Definimos el puerto..
  const server = express(); // Definimos el server.
  server.use(express.json()); // Sepa interpretar los JSON
  server.use(express.urlencoded({ extended: false })); //  Sepa interpretar bien los parametros de las rutas.

  //  Rutas:
  const router = express.Router(); // Definimos el router que será el encargado de manejar las peticiones a nuestras rutas.

  router.get("/", (req, res) => {
    res.send(`Esta es la Home de nuestra API. Estamos usando la BBDD de ${database.connection.name}`);
  });

  //  Para que todas las peticiones que no se correspondan con nuestras rutas den un codigo 404 y manden un mensaje de error.
  router.get("*", (req, res) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página requerida.");
  });

  //  Usamos las rutas (el orden es importante más restrictivos a menos):
  server.use("/author", authorRouter); //  Le decimos al server que utilice el authorRouter importado para gestionar las rutas que tengan "/author".
  server.use("/book", bookRouter); //  Le decimos al server que utilice el bookRouter importado para gestionar las rutas que tengan "/book".
  server.use("/", router); //  Decimos al server que utilice el router en la raíz.

  //  Levantamos el server en el puerto indicado:
  server.listen(PORT, () => {
    console.log(`Server levantado en puerto ${PORT}`);
  });
};

main(); //  Llamamos a la función.
