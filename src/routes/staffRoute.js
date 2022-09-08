const server = require("express").Router();

const { Staff } = require("../db");

server.post("/nuevoStaff", async (req, res) => { 
    try {
      const { Nombre, Apellido_p, Apellido_m, Edad, Ciudad_Residencia } = req.body;
      const staff = await Staff.findOrCreate({
          where: {
            Nombre
          },
          defaults:{
            Apellido_p,
            Apellido_m,
            Edad,
            Ciudad_Residencia
          }    
      });
      res.json(staff);
    } catch (error) {
      res.send(error);
    }
});

server.get("/Staff", async (req, res) => {
  try {
    const staff = await Staff.findAll({
    });
    res.json(staff);
  } catch (error) {     
    res.send(error);
  }
});

  module.exports =  server;

  
module.exports = {
  StaffRoute: server
}