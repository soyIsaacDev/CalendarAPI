const server = require("express").Router();

const { Cliente, Auto } = require("../db");

// GET
//  nuevo -> Registrar un auto para el cliente
//  All -> Todos los Autos
//  porcliente: Autos registrados de un cliente segun el  nombre
server.get("/nuevo/:ClienteId/:Tam/:Nombre", async (req, res) => { 
  try {
    const {  ClienteId, Tam, Nombre } = req.params;

    const tamañoauto = await Auto.findOrCreate({
      where: {
        ClienteId,
        Nombre
      },
      defaults: {
        Tamaño:Tam,

      }
    })
    res.send(tamañoauto);
  } catch (error) {
    res.send(error);
  }
});

server.get("/All", async (req, res) => { 
  try {
    const tamañoauto = await Auto.findAll({    
    })
    res.send(tamañoauto);
  } catch (error) {
    res.send(error);
  }
});

server.get("/porcliente/:ClienteId/:Nombre", async (req, res) => { 
  try {
    let { ClienteId, Nombre } = req.params;
    const auto = await Auto.findAll({ 
      where: {
        ClienteId,
        Nombre
      }   
    });
    res.json(auto===[]? auto : "Error en el cliente o el nombre del auto");
  } catch (error) {
    res.send(error);
  }
});

module.exports =  server;

  
module.exports = {
 AutoRoute: server
}