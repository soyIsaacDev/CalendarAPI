const server = require("express").Router();
const {  Pedidos } = require("../db");

let eventClient = [];

function statusCleanerEvents(request, response, next) {
  const { ClienteId } = request.params;
  console.log("ClienteID "+ ClienteId)
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };

    response.writeHead(200, headers);
        
    //Respondiendo que se establecio la conexion (Esto se podria omitir)
    const data = `data: ${JSON.stringify({id: ClienteId})}\n\n`;
    response.write(data);
    
    //  - Hasta aqui
  
    const newEventSuscriber = {
      id: ClienteId,
      response
    };
  
    eventClient.push(newEventSuscriber);
    console.log("eventClient en Recibir¨"+eventClient)
  
    request.on('close', () => {
      console.log(`${ClienteId} Connection closed`);
      eventClient = eventClient.filter(eventSuscriber => eventSuscriber.id !== ClienteId);
    });
}

async function changeCleanerStatus(request, response, next) {
 
  const { PedidoId, ClienteId } = request.params;
  const pedido = await Pedidos.findOne({
    where: {
      id: PedidoId
    } 
  });
  const StatusdelPedido = pedido.Proceso
  response.json("Message Recieved");
  return sendEvent(StatusdelPedido, ClienteId);
}
  
async function sendEvent(newData, ClienteId) {
  const filteredClient = eventClient.filter(eventSuscriber => eventSuscriber.id === ClienteId); 
  filteredClient.forEach(eventSuscriber => eventSuscriber.response.write(`data: ${JSON.stringify(newData)}\n\n`));
}


server.get('/recibir/:ClienteId', statusCleanerEvents);
server.get('/avisarCambioStatus/:ClienteId/:PedidoId', changeCleanerStatus);

// Avisos al Cleaner
function suscribirCleanerEvents(request, response, next) {
  const { CleanerId } = request.params;
  console.log("Cleaner Listo para recibir cambios  -> ID "+ CleanerId)
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };

    response.writeHead(200, headers);
        
    const newEventSuscriber = {
      id: CleanerId,
      response
    };
  
    eventClient.push(newEventSuscriber);
    console.log("eventClient en Recibir¨"+eventClient)
  
    request.on('close', () => {
      console.log(`${CleanerId} Connection closed`);
      eventClient = eventClient.filter(eventSuscriber => eventSuscriber.id !== CleanerId);
    });
}
server.get('/asignarCleaner/:CleanerId', suscribirCleanerEvents);
server.get('/avisarNuevoPedido/:ClienteId/:PedidoId', changeCleanerStatus);

module.exports = {
  EventsRoute: server
}