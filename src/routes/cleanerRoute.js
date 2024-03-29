const server = require("express").Router();

const { Cleaner, UbicacionCleaner, CleanerStatus, Evaluacion } = require("../db");

/* 
  POST
    NuevoCleaner
    NuevaUbicacion
    cambiarStatusCleaner
    actualizarTiempoxDesocupar
    sendNotificationToken  -> enviar el token de push notification
  GET
    cleaner -> All incluye modelos asociados
    unCleaner -> Incluye modelos asociados
    activos -> No incluye modelos asociados
    AsignarCleaner  -> A medias -> se termino la funcionalidad en Pedidos
    EvaluarCleaner
*/

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



server.post("/sendNotificationToken", async (req, res) => { 
  try {
    const {  CleanerId, pushNotificationToken  } = req.body;
    const cleaner = await Cleaner.findByPk(CleanerId);
    cleaner.NotificationToken = pushNotificationToken;
    await cleaner.save();
      
    res.json("Token recibido "+ cleaner);
  } catch (error) {
    res.send(error);
  }
});

server.get("/prueballegadaCliente", async(req,res)=>{
  try {
    console.log("LLEGADA DESDE APP")
    res.json({"Mensaje":"Si esta llegando al cliente"})
  } catch (e) {
    res.send(e)
  }
})

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
      order:[
        [UbicacionCleaner,'UbicacionCasaSum', 'ASC']
      ]    
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

server.get("/evaluarCleaner/:CleanerId/:Calificacion", async (req, res) => {
  try {
    let { CleanerId, Calificacion } = req.params;
    if(Calificacion > 5){
      Calificacion = 5;
    }
    const evaluacionCleaner = await Evaluacion.create({
      Calificacion,
      CleanerId
    })

    const cleaner = await Cleaner.findOne({ 
      where: { id: CleanerId },
      include: [
        {
          model: Evaluacion
        }
      ]     
    });
    
    let suma = 0;
    var promedio = 0;
    for (let i = 0; i < cleaner.Evaluacions.length; i++) {
      suma = cleaner.Evaluacions[i].Calificacion + suma;
      promedio = suma / cleaner.Evaluacions.length;
     
    }
    cleaner.PromEvaluacion = promedio;
    cleaner.save();

    res.json(evaluacionCleaner);
  } catch (error) {     
    res.send(error);
  }
});

server.get("/solicitarLavado", async (req, res) => {
  try {
    const cleanerDisponible = await Cleaner.findAll({
      // unimos tablas con el include
      // el orden de los includes afecta como se puede ordenar
      // se debe hacer los includes segun como deseamos ordenar
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
        // Ordenamos el primero modelo y luego el segundo.
        order:[
          [ UbicacionCleaner, 'UbicacionCasaSum', 'ASC'],
          [CleanerStatus, 'TiempoxDesocupar', 'ASC']
        ],
      });
    res.json(cleanerDisponible);
  } catch (error) {     
    res.send(error);
  }
});

module.exports =  server;
  
module.exports = {
  CleanerRoute: server
}

