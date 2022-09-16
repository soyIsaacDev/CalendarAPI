const server = require("express").Router();

const { Staff } = require("../db");

server.post("/nuevoStaff", async (req, res) => { 
    try {
      const { Nombre, Apellido_p, Apellido_m, Edad, Ciudad_Residencia, UbicacionCasaLat, UbicacionCasaLong, UbicacionCasaSum } = req.body;
      const staff = await Staff.findOrCreate({
          where: {
            Nombre
          },
          defaults:{
            Apellido_p,
            Apellido_m,
            Edad,
            Ciudad_Residencia,
            UbicacionCasaLat,
            UbicacionCasaLong,
            UbicacionCasaSum
          }    
      });
      res.json(staff);
    } catch (error) {
      res.send(error);
    }
});

server.get("/staff", async (req, res) => {
  try {
    const staff = await Staff.findAll({   
      order:[['UbicacionCasaSum', 'ASC']]   
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