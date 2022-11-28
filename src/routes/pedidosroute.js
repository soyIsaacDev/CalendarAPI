const server = require("express").Router();

const { Cliente, Pedidos, UbicacionCliente,        Cleaner, UbicacionCleaner, CleanerStatus } = require("../db");


server.post("/nuevoPedido", async (req, res) => { 
    try {
      const { ClienteId, Hora, Tipo } = req.body;
      const cliente = await Cliente.findOne({
          where: {
            id: ClienteId
          } 
      });
      const ubicacionCliente = await UbicacionCliente.findOne({
        where: {
          id: ClienteId
        } 
    });
      const pedido = await Pedidos.create({
        clienteId: ClienteId,
        kind: Tipo,
        colorId: 1,
        start: Hora,
        auto: "Definir Auto",
        UbicacionLat: ubicacionCliente.UbicacionLat,
        UbicacionLong: ubicacionCliente.UbicacionLong,
      })
      res.json(pedido);
    } catch (error) {
      res.send(error);
    }
});

server.get("/asignarPedido", async (req, res) => { 
    try {
      const { ClienteId } = req.body;
       /*
      const pedido = await Pedidos.findOne({
        clienteId: ClienteId,
      }) */
      //La variable que afecta la asignacion de Pedidos es el tiempo 
      // total (de translado + tiempo x desocupar)

      //Unir tablas relacionadas y ordenarlas
      const ubicacionCleaner = await Cleaner.findAll({
      // unimos tablas con el include
        include: [
          {
            model: CleanerStatus,
            include: {
              model: UbicacionCleaner
            }
          },
        ],
        // Ordenamos el primero modelo y luego el segundo
        // incluimos el primer modelo que ordenamos y ordenamos el segundo modelo.
        order:[
          [CleanerStatus, 'TiempoxDesocupar', 'ASC'],
          [CleanerStatus, UbicacionCleaner, 'UbicacionCasaSum', 'ASC']
        ],
      
      });
      res.json(ubicacionCleaner);
    } catch (error) {
      res.send(error);
    }
});

server.post("/nuevaubicacion", async (req, res) => { 
  try {
    const {  Usuario, UbicacionLat, UbicacionLong } = req.body;
    const cleaner = await Cleaner.findOne({
      where:{
        Usuario: Usuario
      }
      });
    
    const ubicacionCleaner = await UbicacionCleaner.create(
      {
          UbicacionLat,
          UbicacionLong,
          CleanerId:cleaner.id       
      }
    );
    //ubicacionCliente.setCliente(cliente);
    //cliente.setUbicacionCliente(ubicacionCliente)
    
    res.json(ubicacionCleaner);
  } catch (error) {
    res.send(error);
  }
});

server.get("/cleaner", async (req, res) => {
  try {
    const cleaner = await UbicacionCleaner.findAll({   
      order:[['UbicacionCasaSum', 'ASC']]   
    });
    res.json(cleaner);
  } catch (error) {     
    res.send(error);
  }
});

server.get("/prueba", async (req, res) => {
  try {
    const ubicacionCleaner = await Cleaner.findAll({
      
       include: [
        {
          model: CleanerStatus,
          include: {
            model: UbicacionCleaner
          }
        },
      ],
      
order:[[CleanerStatus, 'TiempoxDesocupar', 'ASC']],
    
    });
    res.json(ubicacionCleaner);
  } catch (e) {
    res.send(e)
  }
});

server.get("/otraprueba", async (req, res) => {
  try {
    const ubicacionCleaner = await Cleaner.findAll({
      
      include: [
        {
          model: CleanerStatus,
          include: {
            model: UbicacionCleaner
          }
        },
      ],
      order:[
        [CleanerStatus, 'TiempoxDesocupar', 'ASC'],
        [CleanerStatus, UbicacionCleaner, 'UbicacionCasaSum', 'ASC']
      ],
    
    });
    res.json(ubicacionCleaner);
  } catch (e) {
    res.send(e)
  }
});

server.get("/activos", async (req, res) => {
  try {
    const cleanerActivo = await CleanerStatus.findAll({
      where: {
        Status: "activo",
      },
      order:[['TiempoxDesocupar', 'ASC']]
    });
    res.json(cleanerActivo);
  } catch (e) {
    res.send(e)
  }
});

  module.exports =  server;

  
module.exports = {
  PedidosRoute: server
}