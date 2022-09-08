const server = require("express").Router();

const { Staff, CalendarEvents } = require("../db");

server.post("/nuevoEvento", async (req, res) => { 
    try {
      const { kind, start, end, colorId, staffId} = req.body;
      const event = await CalendarEvents.findOrCreate({
          where: {
            start
          },
          defaults:{
            kind, end, colorId,StaffId:staffId
          }
      });
      /* const staff = await Staff.findOne({
        where:{
          id: staffId
        }
      })
      console.log(staff)
      event.addStaff(staff); */

      console.log(event)
      res.json(event);
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