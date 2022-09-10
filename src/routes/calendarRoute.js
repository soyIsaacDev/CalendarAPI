const server = require("express").Router();
const { Op } = require("sequelize");

const { Staff, CalendarEvents } = require("../db");

server.post("/nuevoEvento", async (req, res) => { 
    try {
      const { kind, eventStart, eventEnd, colorId, IdStaff} = req.body;
      // Sequelize arroja error si no se define los eventos como Date despues de recibirlos
      const eventStartDate = new Date(eventStart);
      const eventEndDate = new Date(eventEnd);

      const storedEvent = await CalendarEvents.findOne({
        where:{
          [Op.or]:[
            // Falta agregarle un ranto a estas fechas para validar nuevos eventos entre fechas
            {start: eventStartDate},
            {end: eventEndDate}
          ]
        }
      });
      
      if (storedEvent === null){
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
      else if(eventStartDate >= storedEvent.start && eventStartDate <= storedEvent.end || 
              eventEndDate >= storedEvent.start && eventEndDate <= storedEvent.end){
          console.log("NO puedo agendar");
          res.json({respuesta:"no puedo agendar"});
      } 
      else {
        const event = await CalendarEvents.create({
          kind,
          start: eventStart,
          end: eventEnd, 
          colorId,
          StaffId:IdStaff
        })
        res.json(event);
        
      }

      
     

      
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


module.exports = {
  calendarRoute: server
}