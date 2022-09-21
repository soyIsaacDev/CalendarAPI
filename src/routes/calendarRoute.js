const server = require("express").Router();
const { Op } = require("sequelize");

const { Staff, CalendarEventsA, CalendarEventsReq, Citas } = require("../db");

server.get("/asignarEventos", async (req, res) => { 
  // Codigo para hacer la distribucion de pedidos a los repartidores a cierta hora
  try {
    
    /* ESTE PARA PRODUCCION
    
    const currentDate = new Date();
    const currentDatePlusOne = new Date(addHours(1, new Date())); */

    //SOLO para Testing
    const currentDate = new Date("2022-09-20 1:00:00-07:00");
    const currentDatePlusOne = new Date(addHours(1, new Date("2022-09-20 1:00:00-07:00")))

    function addHours(numOfHours, date) {
        //set the date to 1970     time since 1970 in miliseconds  +     hours in miliseconds 
             date.setTime           (date.getTime()                + numOfHours * 60 * 60 * 1000);
             
        return date;
    }
      
    function filterbyHour(events, start, end){
      const storedEvent = events.filter( eventToFilter => start >=  eventToFilter.start && start < eventToFilter.end 
                                               || end > eventToFilter.start && end <= eventToFilter.end 
                                               || start < eventToFilter.start && end > eventToFilter.end
                                        );
      return storedEvent;
    }

    function filterNextHours(events, ActualDate, ActualDatePlusOne){
      const eventosFiltrados = [];
      // para filtrar entre las 7:00am y las 5:00pm
      for (let i = 6; i <= 16; i++) {  
        
        var fechadeHoy = new Date();
        fechadeHoy.setTime(ActualDate.getTime());
        
        var fechadeHoyMasUno = new Date();
        fechadeHoyMasUno.setTime(ActualDatePlusOne.getTime());

        const start = new Date(addHours(i, fechadeHoy));
        console.log("Start  "+ i + "  Fecha  " + start)
        const end = new Date(addHours(i, fechadeHoyMasUno));
        console.log("End    "+ i + "  Fecha  " + end)
        // eventos ordenados en una hora especifica 
        const filteredbyHourEvents = filterbyHour(events, start, end)
        
        for (let z = 0; z < filteredbyHourEvents.length; z++) {
          eventosFiltrados.push(filteredbyHourEvents[z]);
        }
      }
      return eventosFiltrados;
    };

    //  ++++++++++++      AHI LA LLEVAMOS sigue apareciendo uno de mas   +++++++++++++

    function filtradoSinRepeticiones(eventos){
      const array = [];
      console.log("Primer Evento ID   "+eventos[0].id)
      array.push(eventos[0]);
      console.log("Primer Evento Array ID   "+array[0].id)
      for (let i = 1; i < eventos.length; i++) {
        if(eventos[i].id != eventos[i-1].id){
          array.push(eventos[i]);
        }
      }

      return array;
    } 


    let currentHour = currentDate.getHours();
    

    if(currentHour === 1 ){

      const staff = await Staff.findAll({   order:[['UbicacionCasaSum', 'ASC']]   });
      const rawStoredEvent = await CalendarEventsReq.findAll({ order:[['UbicacionSum', 'ASC']]  });
      
      const filtrosSigHoras = filterNextHours(rawStoredEvent, currentDate, currentDatePlusOne);
      const filtradoFin = filtradoSinRepeticiones(filtrosSigHoras);
      
      /* for (let i = 0; i < staff.length; i++) {
            const citas = await Citas.create({
                StaffId: staff[i].id,
                ClienteId: eventosFiltrados[i].ClienteId,
                start: eventosFiltrados[i].start,
                end: eventosFiltrados[i].end,
                ubicacion: {Lat: eventosFiltrados[i].ubicacionLat, Long: eventosFiltrados[i].ubicacionLong}
            });
        } */

      res.json(filtradoFin)
      
    
      /*
        // asignar primero 1.- eventos recurrentes, 2 .- solicitados con tiempo de anticipacion 3.-luego los mas recientes
        // asignar primero eventos de horas especificas y luego los de rango de horas
        // separar citas X primera hora y citas para horas subsequentes

         const faltanXAsignar = eventosFiltrados.length - staff.length;
            faltan.push= {
              hora: start,
              faltantes: faltanXAsignar
            }

         
      }*/
      //res.json(eventosFiltrados);
      // Si sobran eventos como asignarlos?
      
      //res.json({CitasProgramadas: "Ok"});
    }

  } catch (error) {
    res.send(error);
  }
});


server.post("/reqEvento", async (req, res) => { 
  try {
    const { kind, colorId, eventStart, eventEnd, ubicacionLat, ubicacionLong, UbicacionSum, IdCliente} = req.body;
    // Sequelize No compara bien si no se definen los eventos como Date despues de recibirlos
    const start = new Date(eventStart);
    const end = new Date(eventEnd);

    const rawStoredEvent = await CalendarEventsReq.findAll({
      // Op.between no esta funcionando por eso busco todo y despues filtro
      where:{
        ClienteId: IdCliente
      }
    });

    /* const storedEvent = rawStoredEvent.filter( storedEvent => eventStartDate >= storedEvent.start && eventStartDate < storedEvent.end 
      || eventEndDate > storedEvent.start && eventEndDate <= storedEvent.end 
      || eventStartDate < storedEvent.start && eventEndDate > storedEvent.ends
    ); */
    const storedEvent = rawStoredEvent.filter( eventToFilter => start >=  eventToFilter.start && start < eventToFilter.end 
      || end > eventToFilter.start && end <= eventToFilter.end 
      || start < eventToFilter.start && end > eventToFilter.end
    );
      
    if (storedEvent.length === 0){
      console.log("Estoy en null")
      const event = await CalendarEventsReq.create({
          kind,
          colorId,
          start: start,
          end: end,
          ubicacionLat,
          ubicacionLong,
          UbicacionSum,
          ClienteId:IdCliente,
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
  const eventos = await CalendarEventsReq.findAll({});
  
  

  res.json(eventos);
} catch (error) {
  res.send(error);
}
})

module.exports = {
  CalendarRoute: server
}