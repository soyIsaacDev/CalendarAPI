const server = require("express").Router();
const { Op } = require("sequelize");

const { Staff, CalendarEvents } = require("../db");

server.post("/nuevoEvento", async (req, res) => { 
    try {
      const { kind, eventStart, eventEnd, colorId, IdStaff} = req.body;
      // Sequelize arroja error si No se define los eventos como Date despues de recibirlos
      const eventStartDate = new Date(eventStart);
      const eventEndDate = new Date(eventEnd);

      const rawStoredEvent = await CalendarEvents.findAll({
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
        const event = await CalendarEvents.create({
            kind,
            start: eventStartDate,
            end: eventEndDate, 
            colorId,
            StaffId:IdStaff
        })
        res.json(event);
        } 
      else{
          console.log("NO puedo agendar");
          res.json({respuesta:"no puedo agendar"});
      } 
     /*  else {
        const event = await CalendarEvents.create({
          kind,
          start: eventStart,
          end: eventEnd, 
          colorId,
          StaffId:IdStaff
        })
        res.json(event);
        
      } */

      
     

      
    } catch (error) {
      res.send(error);
    }
});

server.get("/eventos", async(req, res) => {
  try {
    const eventos = await CalendarEvents.findAll({});
    res.json(eventos);
  } catch (error) {
    res.send(error);
  }
})

server.get("/eventosFiltrados", async(req,res) => {
  try {
    const { eventStart, eventEnd, IdStaff} = req.body;

    const eventStartDate = new Date(eventStart);
    const eventEndDate = new Date(eventEnd);

    const storedEvent = await CalendarEvents.findAll({
      where:{
        StaffId: IdStaff
      }
    });

    const filteredStoredEvent = storedEvent.filter(
         storedEvent => eventStartDate >= storedEvent.start && eventStartDate < storedEvent.end 
      || eventEndDate > storedEvent.start && eventEndDate <= storedEvent.end 
      || eventStartDate < storedEvent.start && eventEndDate > storedEvent.end
    );

    console.log(filteredStoredEvent)
    res.json(filteredStoredEvent);
  } catch (error) {
    res.send(error);
  }
})

module.exports = {
  calendarRoute: server
}