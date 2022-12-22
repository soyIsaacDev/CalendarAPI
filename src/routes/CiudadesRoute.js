const server = require("express").Router();

const { CiudadPais, UbicacionCliente } = require("../db");

/* 
  POST
    NuevaCiudad
  GET
    Ciudades
*/

server.post("/nuevaCiudad", async (req, res) => { 
    try {
      const { Ciudad, Estado, Pais } = req.body;
      const ciudad = await CiudadPais.findOrCreate({
          where: {
            Ciudad
          },
          defaults:{
            Estado,
            Pais
          }    
      });
      res.json(ciudad);
    } catch (error) {
      res.send(error);
    }
});

server.get("", async (req, res) => { 
  try {
    
     const ciudades = await CiudadPais.findAll();
    res.json(ciudades);
  } catch (error) {
    res.send(error);
  }
});

server.get("/ubicacionClientesxCiudad", async (req, res) => { 
  try {
    
     const ciudades = await CiudadPais.findAll({
      include: [
        {
          model: UbicacionCliente
        },
      ]
     });
    res.json(ciudades);
  } catch (error) {
    res.send(error);
  }
});

module.exports =  server;

  
module.exports = {
  CiudadesRoute: server
}