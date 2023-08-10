const server = require("express").Router();
const express = require("express");

const { Cliente, UserData, UbicacionCliente, CiudadPais, ImgCliente } = require("../db");
const uploadImgPerfilCliente = require("../controllers/uploadPerfilCliente");
const upload = require("../middleware/upload");
/* 
  POST
    agregarPerfilCliente -> Agregar imagen del perfil del Cliente
    NuevoCliente -> Datos basicos login
    NuevaUbicacion
    Editarubicacion -> Editar Nombre y Detalles
  GET
    cambiarUbicacionDefault
    Clientes -> Info de todos los clientes incluyendo Ubicacion
    Usuario
    ubicacionCliente x ClienteId
    eliminarubicacion -> se elimina con el Id de la ubicacion;
    ubicacionClientebyDefault/:ClienteId  --> Ordenado por Default Ascendente y consulta por ClienteId
    getImagenPerfil

*/
server.post("/agregarPerfilCliente", upload.single("file"), uploadImgPerfilCliente.uploadPerfilCliente, );

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
    const ultimaubicacion = await ubicacionCliente.length-1;

    var Default = "X";
    if(ultimaubicacion === -1){
      // Si no hay ninguna ubicacion guardada de este cliente
      Default = 1;
    }
    else{
      const ultimoDefault = await ubicacionCliente[ultimaubicacion].Default;
      Default = await ultimoDefault + 1;
    }

    const ubicacionClienteCreada = await UbicacionCliente.create(
      {
          UbicacionLat,
          UbicacionLong,
          ClienteId:cliente.id, 
          Nombre: Direccion,
          Direccion,
          Default: Default,    
          /* CiudadPaiId:1 */
      }
    );
    
    res.json(ubicacionClienteCreada? ubicacionClienteCreada : "No se pudo crear la ubicacion");
  } catch (error) {
    res.send(error);
  }
});
server.post("/editarubicacion", async (req, res) => { 
  try {
    const {  UbicacionId, Nombre, Detalles, Direccion} = req.body;
    console.log("Editar Ubicacion " + UbicacionId)
    const ubicacionCliente = await UbicacionCliente.findByPk(UbicacionId);

    // Editamos
    ubicacionCliente.Nombre = Nombre;
    ubicacionCliente.Detalles = Detalles;
    ubicacionCliente.Direccion = Direccion;

    // Guardamos
    await ubicacionCliente.save();
    
    res.json(ubicacionCliente);
  } catch (error) {
    res.send(error);
  }
});

server.get("/Usuario/:ClienteId", async(req,res)=>{
  try {
    const { ClienteId } = req.params;
    const usuario = await Cliente.findByPk(ClienteId);
    res.json(usuario)
  } catch (e) {
    res.send(e)
  }
})
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
      let count = i+1;
      let countString = count.toString();
      cambioUbicacion[i].Default = i+1;
      console.log("CambioUbicacionDefault "+cambioUbicacion[i].Default)
      await cambioUbicacion[i].save();
    }
    const ubicacion = await UbicacionCliente.findByPk(UbicacionId);
    ubicacion.Default = 0;
    await ubicacion.save(); 
    
    const ubicacionOrdenada = await UbicacionCliente.findAll({
      where: {
        ClienteId
      },
      order:[["Default", "DESC"]]
    });
    console.log(cambioUbicacion); 
    res.json(ubicacionOrdenada? ubicacionOrdenada : "No existe esa ubicacion");
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

server.get("/ubicacionClientebyDefault/:ClienteId", async (req, res) => {
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
      order:[["Default", "ASC"]]
    });
    
    res.json(ubicacionCliente);
  } catch (error) {
    res.send(error);
  }
});

server.get("/getImagenPerfil/:ClienteId", async (req, res) => {
    try {
      const { ClienteId } = req.params;
      const imagenPerfil = await ImgCliente.findOne({
        where: { ClienteId },
        attributes: ['img_name'],
        include: [
          {
            model: Cliente
          },
        ]
      },);
      imagenPerfil? res.send(imagenPerfil) : res.json({Mensaje:"No se encontraron fotos de este perfil"});
      
    } catch (e) {
      res.send(e);
    } 
  }
);

// Para ver las imagenes
const path = require('path');
var public = path.join(__dirname,'../../uploads');
server.use('/imagenes', express.static(public));

module.exports =  server;

  
module.exports = {
  ClienteRoute: server
}