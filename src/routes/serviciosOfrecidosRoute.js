const server = require("express").Router();
const { ServiciosOfrecidos } = require("../db");

server.get("/servicios", async (req, res) => {
  res.send("ServiciosOfrecidos")
});

server.post("/serviciosOfrecidos", async (req, res) => {
    const { TipoDeServicio, TamañoAuto, Precio } = req.body;
    try {
      const servicios = await ServiciosOfrecidos.findOrCreate({ 
        where: { TipoDeServicio },
        defaults: {
            TamañoAuto,
            Precio
        }
      });
      res.json(servicios);
    } catch (error) {     
      res.send(error);
    }
});

server.get("/serviciosOfrecidos", async (req, res) => {
    try {
      const servicios = await ServiciosOfrecidos.findAll({ 
            
      });
      res.json(servicios);
    } catch (error) {     
      res.send(error);
    }
});

module.exports =  server;

module.exports = {
  ServiciosOfrecidosRoute: server
}