//Direccionamiento con Express
    //https://expressjs.com/es/guide/routing.html
    
const express = require('express');
const app = express();

const { StaffRoute  } = require('./src/routes/staffRoute');
const { calendarRoute } = require("./src/routes/calendarRoute");


app.use(express.json()); //  -->  habilitamos objetos json con el metodo express.json   

app.use(express.static('public')) // --> habilitamos archivos estaticos con el middleware express.static
    //para crear un prefijo en la ruta 
app.use("/assets", express.static(__dirname + "/public"));
//El único parámetro que recibe static es el nombre del directorio donde están los archivos estáticos, en nuestro ejemplo están en /public.


app.get("/", (req,res) => {
    res.send("Hola, el servidor esta activo");
});

app.use("/staff", StaffRoute);
app.use("/calendario", calendarRoute );

//funcion para cachar errores
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
