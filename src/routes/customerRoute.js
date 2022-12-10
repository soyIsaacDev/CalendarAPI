const server = require("express").Router();

const { Cliente, UserData, UbicacionCliente } = require("../db");

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
    const {  ClienteId, UbicacionLat, UbicacionLong } = req.body;
    const cliente = await Cliente.findOne({
      where:{
        id:ClienteId
      }
      });
    
    const ubicacionCliente = await UbicacionCliente.create(
      {
          UbicacionLat,
          UbicacionLong,
          ClienteId:cliente.id       
      }
    );
    //ubicacionCliente.setCliente(cliente);
    //cliente.setUbicacionCliente(ubicacionCliente)
    
    res.json(ubicacionCliente);
  } catch (error) {
    res.send(error);
  }
});

server.get("/Clientes", async (req, res) => {
  try {
    const cliente = await Cliente.findAll({
      include: [
        {
          model: UbicacionCliente
        },
      ]
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