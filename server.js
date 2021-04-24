const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const { checkEmailFromArch } = require("./controllers/email");
const email = require("./router/emails");
const product = require("./router/products");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", email);
app.use("/", product);

/* ------------ Configuración de handlerbars --------------- */
app.engine("hbs", handlebars({ extname: ".hbs", defaultLayout: "index.hbs" }));
app.set("views", "./views");
app.set("view engine", "hbs");

/*  ------------ checkeo del archivo correo.dat ------------ */
checkEmailFromArch();

/* ----- configuracion del puerto y conexion con la DB ----- */
const PORT = process.env.PORT || 8081;

mongoose.connect(
  "mongodb+srv://admin:GmJ1hV7QGZBPgc0S@cluster0.czlrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw new Error(`Error de conexión en la base de datos: ${err}`);
    console.log("Base de datos conectada!");

    const server = app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${server.address().port}`);
    });
    server.on("error", (error) => console.log(`Error en servidor ${error}`));
  }
);
