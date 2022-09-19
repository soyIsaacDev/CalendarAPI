const server = require("express").Router();
const { Op } = require("sequelize");

const { Staff, CalendarEventsReq } = require("../db");

server.post("/nuevoEventoSolicitado", async (req, res) => { 
  try {
    const { kind, colorId, eventStart, eventEnd, ubicacionLat, ubicacionLong, customerId} = req.body;
    // Sequelize No compara bien si no se definen los eventos como Date despues de recibirlos
    const eventStartDate = new Date(eventStart);
    const eventEndDate = new Date(eventEnd);

    const event = await CalendarEventsReq.create({
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

server.get("/eventosSolicitados", async (req, res) => {
  try {
    const eventoProgramado = await CalendarEventsReq.findAll({
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