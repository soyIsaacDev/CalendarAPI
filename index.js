//Direccionamiento con Express
    //https://expressjs.com/es/guide/routing.html
    
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
var passport = require('passport');

const { Cliente } = require("./src/db");

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
const { ImagenRoute } = require("./src/routes/imgPerfil");


app.use(cors());

//app.use(express.json()); //  -->  habilitamos objetos json con el metodo express.json   
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(express.static('public')) // --> habilitamos archivos estaticos con el middleware express.static
    //para crear un prefijo en la ruta 
app.use("/assets", express.static(__dirname + "/public"));
//El único parámetro que recibe static es el nombre del directorio donde están los archivos estáticos, 
//      en nuestro ejemplo están en /public.


app.get("/", (req,res) => {
    res.send("Hola, el servidor esta activo");
});
app.use("/", auth);

/* function verifyUserPassport(){
    console.log("VERIFICANDO DATOS");
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log("verificaUserData")
        const uservData = req.user;
        console.log(JSON.stringify("User Ver Data  "+uservData));
    }
} */

// Middleware que verifica si esta autenticado
function isAuthenticated(req, res, next) {
    const ClienteVerificadoTokenFunction = async () => {
        
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env['SECRET_JWT_TOKEN']);
            console.log("DECODED  "+JSON.stringify(decoded));
            console.log("Decoded User " + decoded.data[0].Usuario);
            const GoogleID = decoded.data[0].googleId;
            console.log("Decoded GoogleID " + GoogleID);
            const clienteVerificadoDB = await Cliente.findOne({ 
                where: {
                    googleId: GoogleID
                }
            })
            console.log("CLIENTE DECODED GOOGLE de DB "+ JSON.stringify(clienteVerificadoDB));
            return clienteVerificadoDB;
        } catch (error) {
            console.log("ERROR "+error);
            
            if(error.name===  'TokenExpiredError'){
                console.log("FAVOR DE RENOVAR EL TOKEN");
                const respuesta = {"Mensaje":"Renovar Token"};
                return respuesta;
            }
            if(error.name === "JsonWebTokenError"){
                console.log("TOKEN MAL FORMADO");
                const respuesta = {"Mensaje":"Renovar Token"};
                return respuesta;
            }
            else{
                return error;
            }
        }
    }
    
    (async() => {
        const ClienteVerificadoToken = await ClienteVerificadoTokenFunction()
        
        console.log("Respuesta CLiente Verificado"+JSON.stringify(ClienteVerificadoToken))
        if(req.isAuthenticated() || ClienteVerificadoToken.googleId) {
            console.log("Todo bien")
            next(); // pasa a la ruta
        } else {
            console.log("Usuario no autenticado");
            res.json(ClienteVerificadoToken);                        
        }
    })();
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
app.use("/calendario",isAuthenticated, CalendarRoute );
app.use("/cliente", isAuthenticated, ClienteRoute);
app.use("/eventosprogramados", EventosProgramados);
app.use("/bulk", isAuthenticated, BulkRoute);
app.use("/AsignarPedidos", isAuthenticated, AsignarPedidos);
app.use("/Pedidos", isAuthenticated, PedidosRoute);
//app.use("/administracion", Administracion);
app.use("/admin/servicios", isAuthenticated, ServiciosOfrecidosRoute);
app.use("/auto", isAuthenticated, AutoRoute);
app.use("/Ciudades", isAuthenticated, CiudadesRoute);
app.use("/imagenes", ImagenRoute);

app.use((req, res, next) => {
    res.status(404).send(" :( Este gatito busco y busco y no encontro lo que buscas! Intenta de nuevo ;)")
  })

//funcion para cachar errores (middleware)
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
