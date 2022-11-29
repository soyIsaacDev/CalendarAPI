const server = require("express").Router();

const { CalendarEventsReq, Cliente, Cleaner, UbicacionCleaner, CleanerStatus } = require("../db");

server.get("/crear", async (req, res) => { 
  try {
    const cleaner = await Cleaner.bulkCreate(
      [
        {
          "Nombre": "A",
          "Apellido": "A",
          "Usuario": "A",
          "Email": "ssdkjkl",
          "Contraseña": "Hermosillo"
        },
        {
          "Nombre": "B",
          "Apellido": "B",
          "Usuario": "B",
          "Email": "kdfsfgdsakjkl",
          "Contraseña": "Hermosillo"
        },
        {
          "Nombre": "C",
          "Apellido": "C",
          "Usuario": "C",
          "Email": "klkjdsfdsaekl",
          "Contraseña": "Hermosillo"
        },
        {
          "Nombre": "D",
          "Apellido": "D",
          "Usuario": "D",
          "Email": "JHkl",
          "Contraseña": "Hermosillo"
        },
        {
          "Nombre": "E",
          "Apellido": "E",
          "Usuario": "E",
          "Email": "Ykl",
          "Contraseña": "Hermosillo"
        },
        {
          "Nombre": "F",
          "Apellido": "F",
          "Usuario": "F",
          "Email": "Tekl",
          "Contraseña": "Hermosillo"
        }
      ]
    );
    
    const clientes = await Cliente.bulkCreate(
      [
        {
          "Nombre": "1",
          "Apellido": "1",
          "Usuario": "1",
          "Email": "klkjdsfdsaekl",
          "Contraseña": "Hermosillo"
        },
        {
          "Nombre": "2",
          "Apellido": "2",
          "Usuario": "2",
          "Email": "retjdsfdsaekl",
          "Contraseña": "Hermosillo"
        },
        {
          "Nombre": "3",
          "Apellido": "3",
          "Usuario": "3",
          "Email": "erjdsfdsaekl",
          "Contraseña": "Hermosillo"
        },{
          "Nombre": "4",
          "Apellido": "4",
          "Usuario": "4",
          "Email": "reaekl",
          "Contraseña": "Hermosillo"
        },{
          "Nombre": "5",
          "Apellido": "5",
          "Usuario": "5",
          "Email": "erjds4654aekl",
          "Contraseña": "Hermosillo"
        },
        {
          "Nombre": "6",
          "Apellido": "6",
          "Usuario": "6",
          "Email": "ew21",
          "Contraseña": "Hermosillo"
        }
      ]
    );

    setTimeout(async () => {
      const cleanerStatus = await CleanerStatus.bulkCreate(
        [ /* 'activo', 'inactivo', 'enservicio' */
          {
            "CleanerId": 1,
            "Status" : 'enservicio',
            "TiempoxDesocupar": 16
          },
          {
              "CleanerId": 2,
              "Status" : 'activo',
              "TiempoxDesocupar": 6
          },
          {
              "CleanerId": 3,
              "Status" : 'enservicio',
              "TiempoxDesocupar": 4
          },
          {
            "CleanerId": 4,
            "Status" : 'activo',
            "TiempoxDesocupar": 4
          },
          {
            "CleanerId": 5,
            "Status" : 'enservicio',
            "TiempoxDesocupar": 4
          },
          {
            "CleanerId": 6,
            "Status" : 'activo',
            "TiempoxDesocupar": 35
          },
        ]
      );
    }, 400);

    /* setTimeout(async () => {
      const cleanerLocation = await UbicacionCleaner.bulkCreate(
        [
          {
            "CleanerId": 1,
            "UbicacionLat" : 29.0877,
            "UbicacionLong": -110.29,
            "UbicacionCasaSum": 0
          },
          {
              "CleanerId": 2,
              "UbicacionLat" : 28.0877,
              "UbicacionLong": -109.15,
              "UbicacionCasaSum": 0
          },
          {
              "CleanerId": 3,
              "UbicacionLat" : 30.01,
              "UbicacionLong": -110.34,
              "UbicacionCasaSum": 0
          },
          {
            "CleanerId": 4,
            "UbicacionLat" : 30.21,
            "UbicacionLong": -108.34,
            "UbicacionCasaSum": 0
          },
          {
            "CleanerId": 5,
            "UbicacionLat" : 28.0877,
            "UbicacionLong": -109.15,
            "UbicacionCasaSum": 0
          },
          {
            "CleanerId": 6,
            "UbicacionLat" : 31.01,
            "UbicacionLong": -100.34,
            "UbicacionCasaSum": 0
          },
        ]
      );
    }, 900); */
    setTimeout(async () => {
      const cleanerLocation = await UbicacionCleaner.bulkCreate(
        [
          {
            "CleanerStatusId": 1,
            "UbicacionLat" : 29.0877,
            "UbicacionLong": -110.29,
            "UbicacionCasaSum": 0
          },
          {
              "CleanerStatusId": 2,
              "UbicacionLat" : 28.0877,
              "UbicacionLong": -109.15,
              "UbicacionCasaSum": 0
          },
          {
              "CleanerStatusId": 3,
              "UbicacionLat" : 30.01,
              "UbicacionLong": -110.34,
              "UbicacionCasaSum": 0
          },
          {
            "CleanerStatusId": 4,
            "UbicacionLat" : 30.21,
            "UbicacionLong": -108.34,
            "UbicacionCasaSum": 0
          },
          {
            "CleanerStatusId": 5,
            "UbicacionLat" : 28.0877,
            "UbicacionLong": -109.15,
            "UbicacionCasaSum": 0
          },
          {
            "CleanerStatusId": 6,
            "UbicacionLat" : 31.01,
            "UbicacionLong": -100.34,
            "UbicacionCasaSum": 0
          },
        ]
      );
    }, 900);

    res.json(cleaner)
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