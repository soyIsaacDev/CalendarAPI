//Direccionamiento con Express
    //https://expressjs.com/es/guide/routing.html
    
const express = require('express');
const cors = require('cors');
const app = express();

const { auth } = require('./src/routes/auth');
const { CleanerRoute  } = require('./src/routes/cleanerRoute');
const { CalendarRoute } = require("./src/routes/calendarRoute");
const { ClienteRoute } = require("./src/routes/customerRoute");
const { EventosProgramados } = require("./src/routes/eventosProgramados");
const { BulkRoute } = require("./src/routes/bulkCrear");
const { AsignarPedidos} = require("./src/routes/AsignarPedidos")
const { PedidosRoute } = require("./src/routes/pedidosroute")
const { ServiciosOfrecidosRoute } = require("./src/routes/serviciosOfrecidosRoute")
const { Administracion } = require("./src/routes/Administrador")
const { AutoRoute } = require("./src/routes/autoRoute")
const { CiudadesRoute } = require("./src/routes/CiudadesRoute");

app.use(cors());
app.use(express.json()); //  -->  habilitamos objetos json con el metodo express.json   

app.use(express.static('public')) // --> habilitamos archivos estaticos con el middleware express.static
    //para crear un prefijo en la ruta 
app.use("/assets", express.static(__dirname + "/public"));
//El único parámetro que recibe static es el nombre del directorio donde están los archivos estáticos, 
//      en nuestro ejemplo están en /public.


app.get("/", (req,res) => {
    res.send("Hola, el servidor esta activo");
});
app.use("/", auth);

// Middleware que verifica si esta autenticado
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next(); // pasa a la ruta
    } else {
        console.log("Usuario no autenticado");
        res.redirect('/login');
    }
}

app.get("/authenticado", isAuthenticated, (req,res) => {
    res.send("Hola, el usuario ha sido authenticado");
});
app.get("/deslogeado", (req,res) => {
    res.send("El Usuario ha sido deslogeado");
});
app.get("/login", (req,res) => {
    res.send("Loggear con google");
});

app.use("/cleaner", isAuthenticated, CleanerRoute);
app.use("/calendario", CalendarRoute );
app.use("/cliente", ClienteRoute);
app.use("/eventosprogramados", EventosProgramados);
app.use("/bulk", BulkRoute);
app.use("/AsignarPedidos", AsignarPedidos);
app.use("/Pedidos", PedidosRoute);
//app.use("/administracion", Administracion);
app.use("/admin/servicios", ServiciosOfrecidosRoute);
app.use("/auto", AutoRoute);
app.use("/Ciudades", CiudadesRoute);


app.use((req, res, next) => {
    res.status(404).send(" :( Este gatito busco y busco y no encontro lo que buscas! Intenta de nuevo ;)")
  })

//funcion para cachar errores (middleware)
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
