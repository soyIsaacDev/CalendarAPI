const server = require("express").Router();

const { CalendarEventsReq, Cliente, Cleaner, UbicacionCleaner, CleanerStatus, UbicacionCliente, ServiciosOfrecidos, 
  Evaluacion, CiudadPais
} = require("../db");


server.get("/crear", async (req, res) => { 
  try {
    const cleaner = await Cleaner.bulkCreate(
      [
        {
          "Nombre": "Santa Fe",
          "Apellido": "A",
          "Usuario": "A",
          "Email": "ssdkjkl",
          "Contraseña": "Hermosillo", 
          "PromEvaluacion": 4
        },
        {
          "Nombre": "Los Portales",
          "Apellido": "B",
          "Usuario": "B",
          "Email": "kdfsfgdsakjkl",
          "Contraseña": "Hermosillo", 
          "PromEvaluacion": 5
        },
        {
          "Nombre": "Quinta Mayor",
          "Apellido": "C",
          "Usuario": "C",
          "Email": "klkjdsfdsaekl",
          "Contraseña": "Hermosillo", 
          "PromEvaluacion":3
        },
        {
          "Nombre": "Valle Hermoso",
          "Apellido": "D",
          "Usuario": "D",
          "Email": "JHkl",
          "Contraseña": "Hermosillo", 
          "PromEvaluacion":3
        },
        {
          "Nombre": "Obispos",
          "Apellido": "E",
          "Usuario": "E",
          "Email": "Ykl",
          "Contraseña": "Hermosillo", 
          "PromEvaluacion":5
        },
        {
          "Nombre": "Sahuaro",
          "Apellido": "F",
          "Usuario": "F",
          "Email": "Tekl",
          "Contraseña": "Hermosillo", 
          "PromEvaluacion":4
        },
        {
          "Nombre": "CDMX",
          "Apellido": "G",
          "Usuario": "G",
          "Email": "CDMX",
          "Contraseña": "CDMX", 
          "PromEvaluacion":4.4
        },
        {
          "Nombre": "Nogales",
          "Apellido": "H",
          "Usuario": "H",
          "Email": "Nog",
          "Contraseña": "Nog", 
          "PromEvaluacion":4.8
        },
        
      ]
    );
    
    

    setTimeout(async () => {
      const cleanerStatus = await CleanerStatus.bulkCreate(
        [ /* 'activo', 'inactivo', 'enservicio' */
          {
            "CleanerId": 1,
            "Status" : 'activo',
            "TiempoxDesocupar": 50
          },
          {
              "CleanerId": 2,
              "Status" : 'activo',
              "TiempoxDesocupar": 5
          },
          {
              "CleanerId": 3,
              "Status" : 'activo',
              "TiempoxDesocupar": 7
          },
          {
            "CleanerId": 4,
            "Status" : 'enservicio',
            "TiempoxDesocupar": 12
          },
          {
            "CleanerId": 5,
            "Status" : 'enservicio',
            "TiempoxDesocupar": 16
          },
          {
            "CleanerId": 6,
            "Status" : 'activo',
            "TiempoxDesocupar": 5
          },
          {
            "CleanerId": 7,
            "Status" : 'activo',
            "TiempoxDesocupar": 28
          },
          {
            "CleanerId": 8,
            "Status" : 'activo',
            "TiempoxDesocupar": 18
          }
        ]
      );
    }, 400);

    setTimeout(async () => {
      const cleanerLocation = await UbicacionCleaner.bulkCreate(
        [
          {
            "CleanerId": 1,
            "UbicacionLat" : 29.088133,
            "UbicacionLong": -110.990829,
            "UbicacionCasaSum": 0
          },
          {
              "CleanerId": 2,
              "UbicacionLat" : 29.076701,
              "UbicacionLong": -110.996486,
              "UbicacionCasaSum": 0
          },
          {
              "CleanerId": 3,
              "UbicacionLat" : 29.082469,
              "UbicacionLong": -110.984148,
              "UbicacionCasaSum": 0
          },
          {
            "CleanerId": 4,
            "UbicacionLat" : 29.087770,
            "UbicacionLong": -110.968448,
            "UbicacionCasaSum": 0
          },
          {
            "CleanerId": 5,
            "UbicacionLat" : 29.087616,
            "UbicacionLong": -111.010969,
            "UbicacionCasaSum": 0
          },
          {
            "CleanerId": 6,
            "UbicacionLat" : 29.101345,
            "UbicacionLong": -110.996368,
            "UbicacionCasaSum": 0
          },
          {
            "CleanerId": 7,
            "UbicacionLat" : 19.41,
            "UbicacionLong": -99.17,
            "UbicacionCasaSum": 0
          },
          {
            "CleanerId": 8,
            "UbicacionLat" : 31.29,
            "UbicacionLong": 110.94,
            "UbicacionCasaSum": 0
          },
        ]
      );

      /* const clientes = await Cliente.bulkCreate(
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
            "Email": "Quintas",
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
      ); */

      setTimeout(async () => {
        const clienteLocation = await UbicacionCliente.bulkCreate(
          [
            {
              "ClienteId": 1,
              "UbicacionLat" : 29.084544,
              "UbicacionLong": -110.990528,
              "UbicacionCasaSum": 0,
              "Nombre":"Las Quintas",
              "Default": 1, 
              "CiudadPaiId":1
            },
            /* {
                "ClienteId": 2,
                "UbicacionLat" : 29.08,
                "UbicacionLong": -110.99,
                "UbicacionCasaSum": 0,
                "Nombre":"Principal",
                "Default": 1,
                "CiudadPaiId":1
            },
            {
                "ClienteId": 3,
                "UbicacionLat" : 30.01,
                "UbicacionLong": -110.34,
                "UbicacionCasaSum": 0,
                "Nombre":"Principal",
                "Default":1,
                "CiudadPaiId":1
            },
            {
              "ClienteId": 4,
              "UbicacionLat" : 30.21,
              "UbicacionLong": -108.34,
              "UbicacionCasaSum": 0,
              "Nombre":"Principal",
              "Default": 1,
              "CiudadPaiId":1
            },
            {
              "ClienteId": 5,
              "UbicacionLat" : 28.0877,
              "UbicacionLong": -109.15,
              "UbicacionCasaSum": 0,
              "Nombre":"Principal",
              "Default": 1,
              "CiudadPaiId":1
            },
            {
              "ClienteId": 6,
              "UbicacionLat" : 31.01,
              "UbicacionLong": -100.34,
              "UbicacionCasaSum": 0,
              "Nombre":"Principal",
              "Default": 1,
              "CiudadPaiId":1
            }, */
          ]
        ); 
      });

    }, 900);

    setTimeout(async () => {
      const servicios = await ServiciosOfrecidos.bulkCreate(
        [
          {
            "TipoDeServicio": "Lavado y Aspirado",
            "TamañoAuto" : "Chico",
            "Precio": 120
          },
          {
            "TipoDeServicio": "Lavado y Aspirado",
            "TamañoAuto" : "Grande",
            "Precio": 130
          },
          {
            "TipoDeServicio": "Lavado Exterior",
            "TamañoAuto" : "Chico",
            "Precio": 80
          },
          {
            "TipoDeServicio": "Lavado Exterior",
            "TamañoAuto" : "Grande",
            "Precio": 90
          },
        ]
        ); 
      }, 100);

      setTimeout(async () => {
        const evaluacion = await Evaluacion.bulkCreate(
          [
            {
              "CleanerId": 1,
              "Calificacion" : 4
            },
            {
              "CleanerId": 2,
              "Calificacion" : 5
            },
            {
              "CleanerId": 3,
              "Calificacion" : 3
            },
            {
              "CleanerId": 4,
              "Calificacion" : 3
            },
            {
              "CleanerId": 5,
              "Calificacion" : 5
            },
            {
              "CleanerId": 6,
              "Calificacion" : 4
            },
          ]
          ); 
        }, 100);

        const ciudad = await CiudadPais.bulkCreate(
          [
            {
              "Ciudad": "Hermosillo",
              "Estado": "Sonora", 
              "Pais": "Mexico"
            }
          ]
        );
        

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