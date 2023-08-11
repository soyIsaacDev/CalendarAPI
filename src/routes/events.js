const server = require("express").Router();


const uuid = require('uuid');

let eventClient = [];

function events(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };

    response.writeHead(200, headers);
    
    const eventSuscriberId = uuid.v4(); 
    
    //Respondiendo que se establecio la conexion (Esto se podria omitir)
    const data = `data: ${JSON.stringify({id: eventSuscriberId})}\n\n`;
    response.write(data);
    
    //  - Hasta aqui
  
    const newEventSuscriber = {
      id: eventSuscriberId,
      response
    };
  
    eventClient.push(newEventSuscriber);
  
    request.on('close', () => {
      console.log(`${eventSuscriberId} Connection closed`);
      eventClient = eventClient.filter(eventSuscriber => eventSuscriber.id !== eventSuscriberId);
    });
}

async function addEvent(request, respsonse, next) {
  const newData = request.body;
  respsonse.json("Message Recieved")
  return sendEventToAll(newData);
}
  
async function sendEventToAll(newData) {
    eventClient.forEach(eventSuscriber => eventSuscriber.response.write(`data: ${JSON.stringify(newData)}\n\n`));
}

server.get('/recibir', events);
server.post('/enviar', addEvent);

module.exports = {
  EventsRoute: server
}