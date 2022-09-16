const server = require("express").Router();

const { Cliente } = require("../db");

server.post("/nuevoCliente", async (req, res) => { 
    try {
      const { Nombre, Apellido_p, Apellido_m, Edad, Ciudad_Residencia, UbicacionCasaLat, UbicacionCasaLong } = req.body;
      const cliente = await Cliente.findOrCreate({
          where: {
            Nombre
          },
          defaults:{
            Apellido_p,
            Apellido_m,
            Edad,
            Ciudad_Residencia,
            UbicacionCasaLat,
            UbicacionCasaLong
          }    
      });
      res.json(cliente);
    } catch (error) {
      res.send(error);
    }
});

server.get("/Clientes", async (req, res) => {
  try {
    const cliente = await Cliente.findAll({
    });
    res.json(cliente);
  } catch (error) {     
    res.send(error);
  }
});

  module.exports =  server;

  
module.exports = {
  ClienteRoute: server
}