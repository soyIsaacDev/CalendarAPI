var app = require("./index");
require("dotenv").config();
const { db } = require("./src/db");

const port = process.env.PORT;

const alter = true;

//sequelize model synchronization
// model.sync(options)
//is an async function that returns a promise

/* User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ force: true }) - This creates the table, dropping it first if it already existed
User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has,
             what are their data types, etc), and then performs the necessary changes in the table to make it match the model. */

// Migrations is recomended for production
db.sync({ force: true }).then(function () {
  app.listen(port, function () {
    console.log("Server is listening on port " + port);
  });
});
