const server = require("express").Router();

const { Cleaner, UbicacionCleaner, CleanerStatus, Evaluacion } = require("../db");

server.post("/nuevoCleaner", async (req, res) => { 
    try {
      const { Nombre, Apellido, Usuario, Email, Contraseña } = req.body;
      const cleaner = await Cleaner.findOrCreate({
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
      res.json(cleaner);
    } catch (error) {
      res.send(error);
    }
});

server.post("/nuevaubicacion", async (req, res) => { 
  try {
    const {  CleanerId, UbicacionLat, UbicacionLong } = req.body;
    //const cleaner = await Cleaner.findByPk(CleanerId);
    
    const ubicacionCleaner = await UbicacionCleaner.create(
      {
          UbicacionLat,
          UbicacionLong,
          CleanerId      
      }
    );
    //ubicacionCliente.setCliente(cliente);
    //cliente.setUbicacionCliente(ubicacionCliente)
    
    res.json(ubicacionCleaner);
  } catch (error) {
    res.send(error);
  }
});

server.post("/cambiarStatusCleaner", async (req, res) => { 
  try {
    const {  CleanerId, Status  } = req.body;
      
    const statuscleaner = await CleanerStatus.findOrCreate(
      { 
        where: {
          CleanerId
        },
        defaults:{
          Status
        }    
      }
    ); 
    res.json(statuscleaner);
  } catch (error) {
    res.send(error);
  }
});

server.post("/actualizarTiempoxDesocupar", async (req, res) => { 
  try {
    const {  CleanerId,  TiempoParaDesocupar  } = req.body;
    const statuscleaner = await CleanerStatus.findByPk(CleanerId);

    statuscleaner.TiempoxDesocupar = TiempoParaDesocupar;
    await statuscleaner.save();   

    res.json(statuscleaner);
  } catch (error) {
    res.send(error);
  }
});

server.get("/cleaner", async (req, res) => {
  try {
    const cleaner = await Cleaner.findAll({ 
      include: [
        {
          model: UbicacionCleaner
        },
        {
          model: CleanerStatus
        },
        {
          model: Evaluacion
        }
      ],
      order:[['UbicacionCasaSum', 'ASC']]    
    });
    res.json(cleaner);
  } catch (error) {     
    res.send(error);
  }
});

server.get("/unCleaner/:cleanerId", async (req, res) => {
  try {
    let { cleanerId } = req.params;
    const cleaner = await Cleaner.findOne({ 
      where: { id: cleanerId },
      include: [
        {
          model: UbicacionCleaner
        },
        {
          model: CleanerStatus
        },
        {
          model: Evaluacion
        }
      ]     
    });
    res.json(cleaner);
  } catch (error) {     
    res.send(error);
  }
});

server.get("/activos", async (req, res) => {
  try {
    const cleanerActivo = await CleanerStatus.findAll({
      where: {
        Status: "activo",
      },
      order:[['TiempoxDesocupar', 'ASC']]
    });
    res.json(cleanerActivo);
  } catch (e) {
    res.send(e)
  }
});

server.get("/asignarcleaner", async (req, res) => {
  try {
    const ubicacionCleaner = await UbicacionCleaner.findAll({
      order:[['UbicacionCasaSum', 'ASC']]
    });
    /* const cleaner = await Cleaner.findOne({ 
      where: {
        CleanerId: ubicacionCleaner[0].CleanerId
      }  
        
    }); */
    
    const cleanerActivo = await CleanerStatus.findAll({
      where: {
        Status: "activo"
      }
    });
    const cleanerEnServicio = await CleanerStatus.findAll({
      where: {
        Status: "activo"
      },
      order:[['TiempoxDesocupar', 'ASC']]
    });
 
    /* const asignarCleanerxPrioridad = (cleanerActivo, cleanerEnServicio, ubicacion) =>{
      for (let i = 0; i < ubicacion.length; i++) {
        if(cleanerActivo[i].CleanerId === ubicacion[x].CleanerId ){
          return ubicacion.CleanerId;
        }
        else {
          
        }
      }
    }

    const ejemploFiltro = cleanerEnServicio.filter( eventToFilter => condiciones); */


    res.json(cleanerEnServicio);
  } catch (error) {     
    res.send(error);
  }
});

  module.exports =  server;

  
module.exports = {
  CleanerRoute: server
}