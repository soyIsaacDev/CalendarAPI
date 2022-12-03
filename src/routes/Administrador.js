const server = require("express").Router();

server.get("/A", async (req, res) => {
    try {
      console.log("Admin")
      res.send("Estas en Admin");
    } catch (error) {     
      res.send(error);
    }
});
module.exports =  server;

module.exports = {
    ServiciosOfrecidos:require("./serviciosOfrecidosRoute"),
    Administracion: server
}