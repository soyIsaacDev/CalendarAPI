const server = require("express").Router();

/*  
  GET
    googlemapsApiKey
*/

server.get("/googlemapskey", async (req, res) => { 
  try {
    res.json("AIzaSyBc1KbxiLyo7rw7ul_UW6gWl3nNoIW7Q3I");
  } catch (error) {
    res.send(error);
  }
});

module.exports =  server;
  
module.exports = {
 ApiRoute: server
}