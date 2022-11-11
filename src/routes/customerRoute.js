const server = require("express").Router();

const { Cliente, UserData, Ubicacion } = require("../db");

server.post("/nuevoCliente", async (req, res) => { 
    try {
      const { Nombre, Apellido, Usuario, Email, Contraseña } = req.body;
      const cliente = await Cliente.findOrCreate({
          where: {
            Nombre
          },
          defaults:{
            Apellido,
            Usuario,
            Email,
            Contraseña
          }    
      });
      res.json(cliente);
    } catch (error) {
      res.send(error);
    }
});

server.post("/nuevaubicacion", async (req, res) => { 
  try {
    const {  Usuario, UbicacionLat, UbicacionLong } = req.body;
    const cliente = await Cliente.findOne({
      where:{
        Usuario: Usuario
      }
    });
    
    const ubicacionCliente = await Ubicacion.Create({
        defaults:{
          UbicacionLat,
          UbicacionLong
        }    
    });
    ubicacionCliente.setCliente(cliente);
    
    res.json(ubicacionCliente);
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