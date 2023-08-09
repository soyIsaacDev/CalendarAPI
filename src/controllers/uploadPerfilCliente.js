const fs = require("fs");
const {  ImgCliente, Cliente  } = require("../db");

const path = require('path');
const carpeta = path.join(__dirname, '../../uploads')
console.log("DIRECTORIO" + carpeta)

const uploadPerfilCliente = async (req, res) => {
    try {
      const bodyObj = req.body.data;
      const parsedbodyObj = JSON.parse(bodyObj)
      const {clienteid} = parsedbodyObj;
      const {Telefono} = parsedbodyObj;
      console.log("telefono" + Telefono )
      if (req.file == undefined) {
        return res.send(`Selecciona una imagen para tu perfil`);
      }

      console.log ("ClienteId de Imagen " + clienteid);
      const imagenPerfil = await ImgCliente.create({
        type: req.file.mimetype,
        img_name: req.file.filename,
        ClienteId: clienteid
      });
      console.log("Imagen Cliente "+imagenPerfil);

      const cliente = await Cliente.findOrCreate({
        where: {
          id:clienteid
        }   
      });
     cliente[0].Telefono = Telefono;
     await cliente[0].save();

      res.json(`Se creo la imagen de cliente ` + imagenPerfil + " del cliente " + cliente[0].Nombre);
      
    } catch (error) {
      console.log(error);
      return res.send(`Error al intentar crear la imagen del cliente: ${error}`);
    }
  };

  module.exports = {
    uploadPerfilCliente
  };