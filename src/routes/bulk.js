const server = require("express").Router();

const { CalendarEventsReq, Cliente } = require("../db");


server.get("/clientes", async (req, res) => { 
    try {
      const clientes = await Cliente.bulkCreate(
        [
          {
            "Nombre": "1",
            "Apellido_p": "1",
            "Apellido_m": "a",
            "Edad": 23,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 29.0956 ,
            "UbicacionCasaLong": -110.85,
            "UbicacionCasaSum": 0
          },
          {
            "Nombre": "2",
            "Apellido_p": "2",
            "Apellido_m": "b",
            "Edad": 21,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 29.0152 ,
            "UbicacionCasaLong": -110.93,
            "UbicacionCasaSum": 0
          },
          {
            "Nombre": "3",
            "Apellido_p": "3",
            "Apellido_m": "c",
            "Edad": 23,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 29.0356 ,
            "UbicacionCasaLong": -110.75,
            "UbicacionCasaSum": 0
          }
        ]
      );
      res.json(clientes)
    } catch (e) {
      res.send(e);
    }
  });


server.get("/eventsReq", async (req, res) => { 
  try {
    const eventos = await CalendarEventsReq.bulkCreate(
      [
        {
          "kind": "Lavado",
          "colorId": 1,
          "start": new Date("2022-09-19 8:00:00-07:00"),
          "end": new Date("2022-09-19 9:00:00-07:00"),
          "ubicacionLat" : 29.0877,
          "ubicacionLong": -110.99,
          "ClienteId":1
        },
        {
            "kind": "Lavado",
            "colorId": 1,
            "start": new Date("2022-09-19 6:00:00-07:00"),
            "end": new Date("2022-09-19 7:00:00-07:00"),
            "ubicacionLat" : 28.0877,
            "ubicacionLong": -109.15,
            "ClienteId":2
        },
        {
            "kind": "Lavado",
            "colorId": 1,
            "start": new Date("2022-09-19 10:00:00-07:00"),
            "end": new Date("2022-09-19 11:00:00-07:00"),
            "ubicacionLat" : 28.0877,
            "ubicacionLong": -109.15,
            "ClienteId":3
        },
      ]
    );
    res.json(eventos)
  } catch (e) {
    res.send(e);
  }
});

module.exports = {
    BulkRoute: server
}