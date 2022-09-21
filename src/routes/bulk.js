const server = require("express").Router();

const { CalendarEventsReq, Cliente, Staff } = require("../db");

server.get("/crear", async (req, res) => { 
  try {
    const staff = await Staff.bulkCreate(
      [
        {
          "Nombre": "A",
          "Apellido_p": "A",
          "Apellido_m": "1",
          "Edad": 23,
          "Ciudad_Residencia": "Hermosillo",
          "UbicacionCasaLat": 29.0956 ,
          "UbicacionCasaLong": -108.85,
          "UbicacionCasaSum": 0
        },
        {
          "Nombre": "B",
          "Apellido_p": "b",
          "Apellido_m": "2",
          "Edad": 21,
          "Ciudad_Residencia": "Hermosillo",
          "UbicacionCasaLat": 29.0152 ,
          "UbicacionCasaLong": -110.93,
          "UbicacionCasaSum": 0
        },
        {
          "Nombre": "C",
          "Apellido_p": "c",
          "Apellido_m": "3",
          "Edad": 23,
          "Ciudad_Residencia": "Hermosillo",
          "UbicacionCasaLat": 29.0356 ,
          "UbicacionCasaLong": -110.00,
          "UbicacionCasaSum": 0
        }
      ]
    );
    
    const clientes = await Cliente.bulkCreate(
      [
        {
          "Nombre": "1",
          "Apellido_p": "1",
          "Apellido_m": "a",
          "Edad": 28,
          "Ciudad_Residencia": "Hermosillo",
          "UbicacionCasaLat": 28.0956 ,
          "UbicacionCasaLong": -109.85,
          "UbicacionCasaSum": 0
        },
        {
          "Nombre": "2",
          "Apellido_p": "2",
          "Apellido_m": "b",
          "Edad": 35,
          "Ciudad_Residencia": "Hermosillo",
          "UbicacionCasaLat": 29.252 ,
          "UbicacionCasaLong": -110.52,
          "UbicacionCasaSum": 0
        },
        {
          "Nombre": "3",
          "Apellido_p": "3",
          "Apellido_m": "c",
          "Edad": 31,
          "Ciudad_Residencia": "Hermosillo",
          "UbicacionCasaLat": 29.5356 ,
          "UbicacionCasaLong": -111.15,
          "UbicacionCasaSum": 0
        }
      ]
    );

    setTimeout(async () => {
      const eventos = await CalendarEventsReq.bulkCreate(
        [
          {
            "kind": "Lavado",
            "colorId": 1,
            "start": new Date("2022-09-20 17:00:00-07:00"),
            "end": new Date("2022-09-20 18:00:00-07:00"),
            "ubicacionLat" : 29.0877,
            "ubicacionLong": -110.29,
            "ClienteId":1,
            "UbicacionSum":0
          },
          {
              "kind": "Lavado",
              "colorId": 1,
              "start": new Date("2022-09-20 18:00:00-07:00"),
              "end": new Date("2022-09-20 19:00:00-07:00"),
              "ubicacionLat" : 28.0877,
              "ubicacionLong": -109.15,
              "ClienteId":2,
              "UbicacionSum":0
          },
          {
              "kind": "Lavado",
              "colorId": 1,
              "start": new Date("2022-09-20 19:00:00-07:00"),
              "end": new Date("2022-09-20 20:00:00-07:00"),
              "ubicacionLat" : 30.01,
              "ubicacionLong": -110.34,
              "ClienteId":3,
              "UbicacionSum":0
          },
          {
            "kind": "Lavado",
            "colorId": 1,
            "start": new Date("2022-09-20 16:00:00:00-07:00"),
            "end": new Date("2022-09-20 17:30:00:00-07:00"),
            "ubicacionLat" : 30.01,
            "ubicacionLong": -110.34,
            "ClienteId":3,
            "UbicacionSum":0
          },
          {
            "kind": "Lavado",
            "colorId": 1,
            "start": new Date("2022-09-20 22:00:00:00-07:00"),
            "end": new Date("2022-09-20 23:00:00:00-07:00"),
            "ubicacionLat" : 30.01,
            "ubicacionLong": -110.34,
            "ClienteId":1,
            "UbicacionSum":0
          },
          {
            "kind": "Lavado",
            "colorId": 1,
            "start": new Date("2022-09-20 10:00:00:00-07:00"),
            "end": new Date("2022-09-20 14:00:00:00-07:00"),
            "ubicacionLat" : 30.01,
            "ubicacionLong": -110.34,
            "ClienteId":1,
            "UbicacionSum":0
          },
        ]
      );
      res.json(eventos)
    }, 500);
    
  } catch (e) {
    res.send(e);
  }
});

server.get("/clientes", async (req, res) => { 
    try {
      const clientes = await Cliente.bulkCreate(
        [
          {
            "Nombre": "1",
            "Apellido_p": "1",
            "Apellido_m": "a",
            "Edad": 28,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 28.0956 ,
            "UbicacionCasaLong": -109.85,
            "UbicacionCasaSum": 0
          },
          {
            "Nombre": "2",
            "Apellido_p": "2",
            "Apellido_m": "b",
            "Edad": 35,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 29.252 ,
            "UbicacionCasaLong": -110.52,
            "UbicacionCasaSum": 0
          },
          {
            "Nombre": "3",
            "Apellido_p": "3",
            "Apellido_m": "c",
            "Edad": 31,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 29.5356 ,
            "UbicacionCasaLong": -111.15,
            "UbicacionCasaSum": 0
          }
        ]
      );
      res.json(clientes)
    } catch (e) {
      res.send(e);
    }
  });

  server.get("/staff", async (req, res) => { 
    try {
      const staff = await Staff.bulkCreate(
        [
          {
            "Nombre": "A",
            "Apellido_p": "A",
            "Apellido_m": "1",
            "Edad": 23,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 29.0956 ,
            "UbicacionCasaLong": -108.85,
            "UbicacionCasaSum": 0
          },
          {
            "Nombre": "B",
            "Apellido_p": "b",
            "Apellido_m": "2",
            "Edad": 21,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 29.0152 ,
            "UbicacionCasaLong": -110.93,
            "UbicacionCasaSum": 0
          },
          {
            "Nombre": "C",
            "Apellido_p": "c",
            "Apellido_m": "3",
            "Edad": 23,
            "Ciudad_Residencia": "Hermosillo",
            "UbicacionCasaLat": 29.0356 ,
            "UbicacionCasaLong": -110.00,
            "UbicacionCasaSum": 0
          }
        ]
      );
      res.json(staff)
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
          "ubicacionLong": -110.29,
          "ClienteId":1,
          "UbicacionSum":0
        },
        {
            "kind": "Lavado",
            "colorId": 1,
            "start": new Date("2022-09-19 6:00:00-07:00"),
            "end": new Date("2022-09-19 7:00:00-07:00"),
            "ubicacionLat" : 28.0877,
            "ubicacionLong": -109.15,
            "ClienteId":2,
            "UbicacionSum":0
        },
        {
            "kind": "Lavado",
            "colorId": 1,
            "start": new Date("2022-09-19 10:00:00-07:00"),
            "end": new Date("2022-09-19 11:00:00-07:00"),
            "ubicacionLat" : 30.01,
            "ubicacionLong": -110.34,
            "ClienteId":3,
            "UbicacionSum":0
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