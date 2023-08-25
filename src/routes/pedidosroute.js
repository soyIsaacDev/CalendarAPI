const server = require("express").Router();
const sendPushNotification = require("../middleware/PushNotifications")

const {  Pedidos, UbicacionCliente,  Cleaner, UbicacionCleaner, CleanerStatus, Evaluacion, CleanerCercano, Cliente } = require("../db");

/*  POST 
      solicitar Quicky -> Procesa un pedido y asigna el Cleaner mas cercano (aun no confirmado)
      nuevos Pedidos -> Confirma el pedido
    GET  
      Cambiar Status Proceso
      Quickys Pedidos x Cliente
      UltimoPedido
      Pedidos (All)
  */

server.post("/solicitarQuicky", async (req, res) => { 
  try {
    console.log("Solicitando Quicky")
    const { ClienteId } = req.body;

    const ubicacionCliente = await UbicacionCliente.findOne({
      where: {
        ClienteId: ClienteId
      },
      order:[["Default", "ASC"]]
    });
    const LatCliente = ubicacionCliente.UbicacionLat;
    const LongCliente = ubicacionCliente.UbicacionLong;
    
    //La variable que afecta la asignacion de Pedidos es el tiempo 
    // total (de translado + tiempo x desocupar)

    //Como unir tablas relacionadas y ordenarlas
      
    const cleanerDisponible = await Cleaner.findAll({
    // unimos tablas con el include
    // el orden de los includes afecta como se puede ordenar
    // se debe hacer los includes segun como deseamos ordenar
      include: [
        {
          model: UbicacionCleaner
        },
        {
          model: CleanerStatus
        },
        {
          model: Evaluacion
        }
      ]
    });

      // Aqui buscamos que cleaners estan disponibles, que 
      // tan cerca del cliente y que tan rapido se desocupan
    for (let i = 0; i < cleanerDisponible.length; i++) {
      const statuscleaner = cleanerDisponible[i].CleanerStatus.Status;
      const tiempoxDesocupar = cleanerDisponible[i].CleanerStatus.TiempoxDesocupar;
      const LatCleaner = cleanerDisponible[i].UbicacionCleaners[0].UbicacionLat;
      const LongCleaner = cleanerDisponible[i].UbicacionCleaners[0].UbicacionLong;
    
      var distLat = LatCliente - LatCleaner;
      var distLong = LongCliente - LongCleaner;
  
      if(distLat < 0){
        distLat = distLat*-1;
      }
      if(distLong < 0){
        distLong= distLong*-1;
      }
      const distancia = distLat + distLong;

      await CleanerCercano.create({
        CleanerId: cleanerDisponible[i].id,
        TiempoxDesocupar:tiempoxDesocupar,
        Distancia: distancia,
        DistLat: distLat,
        DistLong: distLong,
        Status: statuscleaner,
        Nombre: cleanerDisponible[i].Nombre,
        TiempoDeLlegada: tiempoxDesocupar,
        PromEvaluacion:cleanerDisponible[i].PromEvaluacion
      });

    }

    const cleanerOrdenado = await CleanerCercano.findAll({
      order: [
        ['Status', 'ASC'],
        ['Distancia', 'ASC'],
        ['TiempoxDesocupar', 'ASC']
      ]
    });
    
    var cleanerAsignado = cleanerOrdenado[0];

    var diferenciaTiempo = cleanerOrdenado[0].TiempoxDesocupar - cleanerOrdenado[2].TiempoxDesocupar; 
    var diferenciaDistancia = cleanerOrdenado[0].Distancia  - cleanerOrdenado[2].Distancia;
      if(diferenciaDistancia < 0){
        diferenciaDistancia= diferenciaDistancia*-1;
      }
    // se asigna al siguiente cleaner si la diferencia en tiempo es  
    // mayor a 20 minutos y la distancia es menor a 2 kilometros
    if(diferenciaTiempo > 20 && diferenciaDistancia < 0.012){
      cleanerAsignado = cleanerOrdenado[2];
    }
    
    var diferenciaTiempo = cleanerOrdenado[0].TiempoxDesocupar - cleanerOrdenado[1].TiempoxDesocupar; 
    var diferenciaDistancia = cleanerOrdenado[0].Distancia  - cleanerOrdenado[1].Distancia;
      if(diferenciaDistancia < 0){
        diferenciaDistancia= diferenciaDistancia*-1;
      }
    // se asigna al siguiente cleaner si la diferencia en tiempo es  
    // mayor a 20 minutos y la distancia es menor a 2 kilometros
    if(diferenciaTiempo > 20 && diferenciaDistancia < 0.02){
      cleanerAsignado = cleanerOrdenado[1];
    }

    // Se borra la tabla para asignar cleaner en el futuro
    await CleanerCercano.truncate({});
    
    res.json(cleanerAsignado? cleanerAsignado: "No hay cleaner disponibles");
  } catch (error) {
    res.send(error);
  }
});


//Confirma el pedido
server.post("/nuevoPedido", async (req, res) => { 
    try {
      const { ClienteId, Tipo, Hora, Auto, CleanerId, Proceso } = req.body;
      console.log("PEDIDOOOOO " + Tipo + Auto)
      const ubicacionCliente = await UbicacionCliente.findAll({
        where: {
          ClienteId: ClienteId
        } 
      });
      const ultimaUbicacionClienteLat = ubicacionCliente[ubicacionCliente.length-1].UbicacionLat;
      const ultimaUbicacionClienteLong = ubicacionCliente[ubicacionCliente.length-1].UbicacionLong;
      console.log("ultimaUbicacionClienteLat "+ ultimaUbicacionClienteLat)
      console.log("ultimaUbicacionClienteLong "+ ultimaUbicacionClienteLong)
      const pedido = await Pedidos.create({
          kind: Tipo,
          colorId: 1,
          auto: Auto,
          start: Hora,
          ubicacionLat: ultimaUbicacionClienteLat,
          ubicacionLong: ultimaUbicacionClienteLong,
          Proceso
      });
      // Asignamos el Cliente y Cleaner
      pedido.ClienteId= ClienteId;
      pedido.CleanerId = CleanerId;
      await pedido.save();

      const cleaner = await Cleaner.findByPk(CleanerId);
      const cliente = await Cliente.findByPk(ClienteId);
    
      const notificationBody = cliente.Nombre + " quiere un quicky"
      console.log("Notificar a " + cleaner.Nombre + " " +cleaner.NotificationToken);
      //sendPushNotification(["ExponentPushToken[3tgWTVNE1HoCFYeVRKvhwi]"],`Nuevo Pedido! ¿Listo para un Quicky?`, notificationBody, pedido);
      sendPushNotification([cleaner.NotificationToken],`Nuevo Pedido! ¿Listo para un Quicky?`, notificationBody, pedido)
      console.log("Pedido " + JSON.stringify(pedido))
      res.json(pedido);
    } catch (error) {
      res.send(error);
    }
});

server.get("/cambiarstatusproceso/:PedidoId/:Status", async (req, res) => {
  try {
    let { PedidoId, Status } = req.params;
    const pedido = await Pedidos.findOne({
      where: {
        id: PedidoId
      } 
    });

    if(Status === "Cancelado"){
      const horaPedido = pedido.start;
      const horaActual = new Date();
      // si la hora de cancelacion es menor a 5 minutos no hay cobro
      // si es mayor hay una multa de 50% del valor del pedido
      const pasaron5minutos = horaActual-horaPedido;
      
      if(pasaron5minutos < 60000){
        pedido.Proceso = "CanceladoSinMulta";
        await pedido.save();
        console.log("menos de 5 minutos");
      } 
      else{
        console.log("CanceladoConMulta");
        pedido.Proceso = "CanceladoConMulta";
        await pedido.save();
      }
    }
    else{
      pedido.Proceso = Status;
      await pedido.save();
    }

    
    res.json(pedido);
  } catch (e) {
    res.send(e)
  }
});

server.get("/quickyspedidos/:ClienteId", async (req, res) => {
  try {
    let { ClienteId } = req.params;
    const pedidos = await Pedidos.findAll({
      where: {
        ClienteId
      },
      order: [['id', 'DESC']]
    });
    res.json(pedidos);
  } catch (e) {
    res.send(e)
  }
});

server.get("/ultimoPedido/:ClienteId", async (req, res) => {
  try {
    let { ClienteId } = req.params;
    console.log("BUSCANDO ULTIMO PEDIDO")
    const pedidos = await Pedidos.findAll({
      where: {
        ClienteId
      },
      order: [['id', 'DESC']]
    });
    const ultimoPedido = pedidos[0];
    res.json(ultimoPedido? ultimoPedido : "El Cliente No Tiene Pedidos");
  } catch (e) {
    res.send(e)
  }
});
server.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Pedidos.findAll({
      order: [['id', 'DESC']]
    });
    res.json(pedidos);
  } catch (e) {
    res.send(e)
  }
});




module.exports =  server;

module.exports = {
  PedidosRoute: server
}