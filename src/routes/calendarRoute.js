const server = require("express").Router();
const { Op } = require("sequelize");

const { Staff, CalendarEventsA, CalendarEventsP } = require("../db");

server.post("/nuevoEvento", async (req, res) => { 
    try {
      const { kind, eventStart, eventEnd, IdStaff, ubicacionLat, ubicacionLong} = req.body;
      // Sequelize No compara bien si no se definen los eventos como Date despues de recibirlos
      const eventStartDate = new Date(eventStart);
      const eventEndDate = new Date(eventEnd);

      const rawStoredEvent = await CalendarEventsA.findAll({
        // Op.between no esta funcionando por eso busco todo y despues filtro
        where:{
          StaffId: IdStaff
        }
      });

      const storedEvent = rawStoredEvent.filter(
           storedEvent => eventStartDate >= storedEvent.start && eventStartDate < storedEvent.end 
        || eventEndDate > storedEvent.start && eventEndDate <= storedEvent.end 
        || eventStartDate < storedEvent.start && eventEndDate > storedEvent.end
      );
        
      if (storedEvent.length === 0){
        console.log("Estoy en null")
        const event = await CalendarEventsA.create({
            kind,
            start: eventStartDate,
            end: eventEndDate,
            StaffId:IdStaff,
            ubicacionLat,
            ubicacionLong
        })
        console.log(event)
        res.json(event);
        } 
      else{
          console.log("NO puedo agendar");
          res.json({respuesta:"no puedo agendar"});
      } 

    } catch (error) {
      res.send(error);
    }
});

server.get("/eventos", async(req, res) => {
  try {
    const eventos = await CalendarEventsA.findAll({});
    
    

    res.json(eventos);
  } catch (error) {
    res.send(error);
  }
})

server.get("/asignarEventos", async (req, res) => { 
  // Codigo para hacer la distribucion de pedidos a los repartidores a cierta hora
  try {
    //const { kind, eventStart, eventEnd, colorId, ubicacion} = req.body;
    const eventStartDate = new Date(eventStart);
    const eventEndDate = new Date(eventEnd);

    const Now = new Date();
    //let currentHour = Now.getHours();
    let currentHour = 1;
    var arrayDistancia = [];

    if(currentHour === 1 ){
      const staff = await Staff.findAll({   order:[['UbicacionCasaSum', 'ASC']]   });
      const eventosProgramados = await CalendarEventsP.findAll({ order:[['ubicacionSum', 'ASC']]  });
      
      for (let i = 0; i < eventosProgramados.length; i++) {
        for (let x = 1; x < staff.length; x++) {
          const distanciaActual = staff[x].UbicacionCasaSum - eventosProgramados[i].ubicacionSum;
          const distanciaAnterior = staff[x-1].UbicacionCasaSum - eventosProgramados[i].ubicacionSum;

          if(x === 1){
            arrayDistancia.push({
              distancia: distanciaAnterior,
              StaffId: staff[x-1].id,
              PedidoId: eventosProgramados[i].id
            });
          }
            //  actual         anterior
          if(distanciaActual < distanciaAnterior){
            arrayDistancia.pop();
            arrayDistancia.push({
              distancia: distanciaActual,
              StaffId: staff[x].id,
              PedidoId: eventosProgramados[i].id
            });
          }
        }

        
      }
      res.json(arrayDistancia);
    }

    
   
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  CalendarRoute: server
}