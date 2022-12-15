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
    const {  ClienteId, Tam } = req.body;

    const auto = await Auto.findAll({ 
      where: {
        ClienteId
      }   
    });

    var Name = null;
    const ultimoauto = auto.length-1;
    switch (ultimoauto) {
      case -1:
        Name = "Primero"
        break;
      
      case 0:
        Name = "Segundo"
        break;
      case 1:
        Name = "Tercero"
        break;
      case 2:
        Name = "Cuarto"
        break;
      case 3:
        Name = "Quinto"
        break;
      case 4:
        Name = "Sexto"
        break;
      case 5:
        Name = "Septimo"
        break;
      case 6:
        Name = "Octavo"
        break;  
      default:
        break;
    }

    const crearauto = await Auto.create({
      ClienteId,
      Nombre:Name,
      Tamaño:Tam,
    })
    res.send(crearauto);
    
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

server.get("/porcliente/:ClienteId", async (req, res) => { 
  try {
    let { ClienteId } = req.params;
    const auto = await Auto.findAll({ 
      where: {
        ClienteId
      }   
    });
    res.json(auto===[]? auto : "El Cliente no tiene autos registados");
  } catch (error) {
    res.send(error);
  }
});

module.exports =  server;

  
module.exports = {
 AutoRoute: server
}