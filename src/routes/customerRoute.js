const server = require("express").Router();

const { Cliente, UserData, UbicacionCliente, CiudadPais } = require("../db");

/* 
  POST
    NuevoCliente -> Datos basicos login
    NuevaUbicacion
    Editarubicacion -> Editar Nombre y Detalles
  GET
    cambiarUbicacionDefault
    Clientes -> UbicacionCliente
    ubicacionCliente x ClienteId
    eliminarubicacion -> se elimina con el Id de la ubicacion;

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
    const {  ClienteId, UbicacionLat, UbicacionLong, Nombre, Direccion, Detalles, Ciudad } = req.body;
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
          Nombre: Direccion,
          Direccion,
          Default,    
          /* CiudadPaiId:1 */
      }
    );

    
    
    res.json(ubicacionClienteCreada);
  } catch (error) {
    res.send(error);
  }
});
server.post("/editarubicacion", async (req, res) => { 
  try {
    const {  UbicacionId, Nombre, Detalles } = req.body;
    console.log("Editar Ubicacion " + UbicacionId)
    const ubicacionCliente = await UbicacionCliente.findByPk(UbicacionId);

    ubicacionCliente.Nombre = Nombre;
    ubicacionCliente.Detalles = Detalles;
    await ubicacionCliente.save();
    
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

server.get("/ubicacionCliente/:ClienteId", async (req, res) => { 
  try {
    const { ClienteId } = req.params;
    
     const ubicacionCliente = await UbicacionCliente.findAll({
      where: {
        ClienteId: ClienteId
      },
      include: [
        {
          model: CiudadPais
        }
      ],
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

server.get("/eliminarubicacion/:UbicacionId", async (req, res) => { 
  try {
    const {  UbicacionId } = req.params;
    const ubicacionCliente = await UbicacionCliente.findByPk(UbicacionId);

    await ubicacionCliente.destroy();
    
    res.json("Se elimino la ubicacion ID " + UbicacionId);
  } catch (error) {
    res.send(error);
  }
});

module.exports =  server;

  
module.exports = {
  ClienteRoute: server
}