const server = require("express").Router();

const { Cliente, UserData, UbicacionCliente } = require("../db");

/* 
  POST
    NuevoCliente -> Datos basicos login
    NuevaUbicacion
  GET
    cambiarUbicacionDefault
    Clientes -> UbicacionCliente
    ubicacionCliente x ClienteId

*/

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
    const {  ClienteId, UbicacionLat, UbicacionLong, Nombre } = req.body;
    const cliente = await Cliente.findOne({
      where:{
        id:ClienteId,
      }
      });
    
    const ubicacionCliente = await UbicacionCliente.findAll({
      where: {
        ClienteId
      }
    });
    var Name = null;
    var Default = null;
    const ultimoubicacion = ubicacionCliente.length-1;
    
    switch (ultimoubicacion) {
      case -1:
        Name = "Principal",
        Default = "1"
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
    

    const ubicacionClienteCreada = await UbicacionCliente.create(
      {
          UbicacionLat,
          UbicacionLong,
          ClienteId:cliente.id, 
          Nombre: Name ,
          Default    
      }
    );
    
    res.json(ubicacionClienteCreada);
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

server.get("/ubicacionCliente/:ClienteId", async (req, res) => { 
  try {
    const { ClienteId } = req.params;
    
     const ubicacionCliente = await UbicacionCliente.findAll({
      where: {
        ClienteId: ClienteId
      } 
    });
    res.json(ubicacionCliente);
  } catch (error) {
    res.send(error);
  }
});

server.get("/cambiarUbicacionDefault/:ClienteId/:UbicacionId", async (req, res) => { 
  try {
    let { ClienteId, UbicacionId } = req.params;
    const cambioUbicacion = await UbicacionCliente.findAll({ 
      where: {
        ClienteId
      }   
    });
    for (let i = 0; i < cambioUbicacion.length; i++) {
      cambioUbicacion[i].Default = null;
      await cambioUbicacion[i].save();
    }
    const ubicacion = await UbicacionCliente.findByPk(UbicacionId);
    ubicacion.Default = "1"
    await ubicacion.save();
    res.json(ubicacion? ubicacion : "No existe esa ubicacion");
  } catch (error) {
    res.send(error);
  }
});

module.exports =  server;

  
module.exports = {
  ClienteRoute: server
}