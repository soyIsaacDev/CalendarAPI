const server = require("express").Router();
const { Op } = require("sequelize");

const { Staff, CalendarEventsP } = require("../db");

server.post("/nuevoEventoProgramado", async (req, res) => { 
  try {
    const { kind, colorId, eventStart, eventEnd, ubicacionLat, ubicacionLong, customerId} = req.body;
    // Sequelize No compara bien si no se definen los eventos como Date despues de recibirlos
    const eventStartDate = new Date(eventStart);
    const eventEndDate = new Date(eventEnd);

    const event = await CalendarEventsP.create({
      kind,
      colorId,
      start: eventStartDate,
      end: eventEndDate, 
      ubicacionLat, 
      ubicacionLong,
      ClienteId: customerId,
    })
    res.json(event);
    
  } catch (error) {
    res.send(error);
  }
});

server.get("/eventosProgramados", async (req, res) => {
  try {
    const eventoProgramado = await CalendarEventsP.findAll({
      order:[['ubicacionSum', 'DESC']]
    });
    res.json(eventoProgramado)
  } catch (error) {
    res.send(error);
  }
})

module.exports = {
  EventosProgramados: server
}