const server = require("express").Router();

const {  Pedidos, UbicacionCliente,  Cleaner, UbicacionCleaner, CleanerStatus, Evaluacion } = require("../db");

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
    const { ClienteId, Tipo, Hora } = req.body;
    let CleanerId = null;

    const ubicacionCliente = await UbicacionCliente.findAll({
      where: {
        ClienteId: ClienteId
      } 
    });
    const ubicacionTotalCliente = ubicacionCliente[ubicacionCliente.length-1].UbicacionCasaSum;
    
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
      ],
      // Ordenamos el primero modelo y luego el segundo.
      order:[
        [ UbicacionCleaner, 'UbicacionCasaSum', 'ASC'],
        [CleanerStatus, 'TiempoxDesocupar', 'ASC']
      ],
    });
      // Aqui buscamos que cleaners estan disponibles, que 
      // tan cerca del cliente y que tan rapido se desocupan
    for (let i = 0; i < cleanerDisponible.length; i++) {
      const statuscleaner = cleanerDisponible[i].CleanerStatus.Status;
      const tiempoxDesocupar = cleanerDisponible[i].CleanerStatus.TiempoxDesocupar;
      var ubicacionTotalCleaner = cleanerDisponible[i].UbicacionCleaners[0].UbicacionCasaSum; 
      
      console.log("i = "+i +" Tiempo "+tiempoxDesocupar+" ubicacionCleaner "+ubicacionTotalCleaner)
      const distancia = ubicacionTotalCleaner - ubicacionTotalCliente
      if(distancia < 0){
        distancia*-1;
      }
      if(tiempoxDesocupar < 10 && distancia < 0.5){
        //pedido.CleanerId = cleanerDisponible[i].id;

        /* 
          MODIFICAR ESTO PARA QUE NO GUARDE EL CLEANER HASTA LLAMAR A LA RUTA ASIGNARPEDIDO
        */
        CleanerId = cleanerDisponible[i].id;
      }
      else if (tiempoxDesocupar < 10 && distancia < 3.5){
        CleanerId = cleanerDisponible[i].id;
      }
      else if (tiempoxDesocupar < 15 && distancia < 0.5){
        CleanerId = cleanerDisponible[i].id;
      }
      else if (tiempoxDesocupar < 15 && distancia < 1.5){
        CleanerId = cleanerDisponible[i].id;
      }
    }

    const cleaner = cleanerDisponible[CleanerId];
    
    res.json(cleaner? cleaner : "No hay cleaner disponibles");
  } catch (error) {
    res.send(error);
  }
});

//Confirma el pedido
server.post("/nuevoPedido", async (req, res) => { 
    try {
      const { ClienteId, Tipo, Hora, CleanerId, Proceso } = req.body;
      console.log("PEDIDOOOOO")
      /* const cliente = await Cliente.findOne({
          where: {
            id: ClienteId
          } 
      }); */
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
        
          ClienteId,
          kind: Tipo,
          colorId: 1,
          auto: "Definir Auto",
          start: Hora,
          ubicacionLat: ultimaUbicacionClienteLat,
          ubicacionLong: ultimaUbicacionClienteLong,
          CleanerId, 
          Proceso
      });
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

    if(Status == "Cancelado"){
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

server.get("/ultimoquickypedido/:ClienteId", async (req, res) => {
  try {
    let { ClienteId } = req.params;
    const pedidos = await Pedidos.findAll({
      where: {
        ClienteId
      } 
    });
    const ultimoPedido = pedidos[pedidos.length-1];
    res.json(ultimoPedido? ultimoPedido : "El Cliente no tiene pedidos");
  } catch (e) {
    res.send(e)
  }
});
server.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Pedidos.findAll({
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