const server = require("express").Router();
const { Op } = require("sequelize");

const { Staff, CalendarEventsA, CalendarEventsP, Citas } = require("../db");

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

      const storedEvent = rawStoredEvent.filter( storedEvent => eventStartDate >= storedEvent.start && eventStartDate < storedEvent.end 
        || eventEndDate > storedEvent.start && eventEndDate <= storedEvent.end 
        || eventStartDate < storedEvent.start && eventEndDate > storedEvent.ends
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
    const Now = new Date();
    //let currentHour = Now.getHours();
    let currentHour = 1;

    if(currentHour === 1 ){

      const staff = await Staff.findAll({   order:[['UbicacionCasaSum', 'ASC']]   });
      const rawStoredEvent = await CalendarEventsP.findAll({ order:[['ubicacionSum', 'ASC']]  });

      function addHours(numOfHours, date) {
        //set the date to 1970     time since 1970 in miliseconds  +     hours in miliseconds 
             date.setTime           (date.getTime()                + numOfHours * 60 * 60 * 1000);
        return date;
      }
      
      function filterbyHour(events, start, end){
        const storedEvent = 
          events.filter( eventToFilter => start >=  eventToFilter.start && start < eventToFilter.end 
                                                 || end > eventToFilter.start && end <= eventToFilter.end 
                                                 || start < eventToFilter.start && end > eventToFilter.end
        );
        return storedEvent;
      }
      
      for (let i = 6; i < 11; i++) {
        const start = addHours(i, Now);
        const end = addHours((i+1), start);
        const faltan = [];
        // eventos ordenados en una hora especifica 
        const eventosFiltrados = filterbyHour(rawStoredEvent, start, end);
        
        // asignar primero 1.- eventos recurrentes, 2 .- solicitados con tiempo de anticipacion 3.-luego los mas recientes
        // asignar primero eventos de horas especificas y luego los de rango de horas
        // separar citas X primera hora y citas para horas subsequentes

        const faltanXAsignar = eventosFiltrados.length - staff.length;
            faltan.push= {
              hora: start,
              faltantes: faltanXAsignar
            }

        for (let i = 0; i < staff.length; i++) {
            const citas = await Citas.create({
                StaffId: staff[i].id,
                ClienteId: eventosFiltrados[i].ClienteId,
                start: eventosFiltrados[i].start,
                end: eventosFiltrados[i].end,
                ubicacion: {Lat: eventosFiltrados[i].ubicacionLat, Long: eventosFiltrados[i].ubicacionLong}
            });
        }
      }

      // Si sobran eventos como asignarlos?
      
      res.json({CitasProgramadas: "Ok"});
    }

  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  CalendarRoute: server
}