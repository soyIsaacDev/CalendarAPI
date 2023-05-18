const fs = require("fs");
const {  ImgCliente  } = require("../db");

const path = require('path');
const carpeta = path.join(__dirname, '../../uploads')
console.log("DIRECTORIO" + carpeta)

const uploadPerfilCliente = async (req, res) => {
    try {
      const bodyObj = req.body.data;
      const parsedbodyObj = JSON.parse(bodyObj)
      const {clienteid} = parsedbodyObj;
      if (req.file == undefined) {
        return res.send(`Selecciona una imagen para tu perfil`);
      }

      console.log ("ClienteId de Imagen " + clienteid);
      const imagenPerfil = await ImgCliente.create({
        type: req.file.mimetype,
        name: req.file.filename,
        data: fs.readFileSync(
          carpeta +"/"+ req.file.filename
        ),
        ClienteId: clienteid
      }).then((image) => {
        fs.writeFileSync(
          carpeta + image.name,
          image.data
        );
      }); 
      console.log("Imagen Cliente "+imagenPerfil);
      
      res.json(`Se creo la imagen de cliente ` + imagenPerfil);
      
    } catch (error) {
      console.log(error);
      return res.send(`Error al intentar crear la imagen del cliente: ${error}`);
    }
  };

  module.exports = {
    uploadPerfilCliente
  };