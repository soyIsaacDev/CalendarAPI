const server = require("express").Router();

const { Cliente, Auto } = require("../db");

/*  
  POST
    nuevo -> Registrar un auto para el cliente
  GET
    All -> Todos los Autos
    porcliente: Autos registrados de un cliente segun el  nombre 
*/
server.post("/nuevo", async (req, res) => { 
  try {
    const {  ClienteId, Tam, Nombre } = req.body;

    const auto = await Auto.findAll({ 
      where: {
        ClienteId
      }   
    });

    if(auto.length===0){
      if(auto.Nombre!==Nombre){
        const crearauto = await Auto.create({
          ClienteId,
          Nombre,
          Tamaño:Tam,
        })
        res.send(crearauto);
      }
    }
    
    else {
      res.send("El auto ya se encuentra creado")
    }
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