const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbEngine = process.env.DB_ENGINE;
const dbUserName = process.env.DB_USER;
const dbPasword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const connectionString = `${dbEngine}://${dbUserName}:${dbPasword}@${dbHost}:${dbPort}/${dbName}`;
const sequelize = new Sequelize(connectionString, {
  logging: false, //Loging Deshabilitado,
});
//const sequelize = new Sequelize('postgres://postgres:Postgres@localhost:5432/nearbycalendar');

try {
  sequelize.authenticate();
  console.log("Conexion a la Base de Datos Exitosa.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

//Modelos DB

const modelCleaner = require("./models/Cleaner");
const modelEvaluacion = require("./models/Evaluacion");
const modelCalendarEventsAsig = require("./models/calendarEventsAsig");
const modelCalendarEventReq = require("./models/calendarEventsReq");
const modelCliente = require("./models/Cliente");
const modelCitas = require("./models/citas");
const modelUserData = require("./models/UserData");
const modelUbicacionCliente = require("./models/UbicacionCliente")
const modelUbicacionCleaner = require("./models/UbicacionCleaner");
const modelPedido = require("./models/Pedidos");
const modelAutos = require("./models/Autos");
const modelCleanerStatus = require("./models/CleanerStatus")

//pasamos instancia de sequelize a los modelos
modelCleaner(sequelize);
modelEvaluacion(sequelize);
modelCalendarEventsAsig(sequelize);
modelCalendarEventReq(sequelize);
modelCliente(sequelize);
modelCitas(sequelize);
modelUserData(sequelize);
modelUbicacionCliente(sequelize);
modelUbicacionCleaner(sequelize);
modelPedido(sequelize);
modelAutos(sequelize);
modelCleanerStatus(sequelize);

let {Cleaner, Evaluacion, CalendarEventsAsig, CalendarEventsReq, Cliente, Citas, UserData, UbicacionCliente, UbicacionCleaner, Pedidos, Auto, CleanerStatus} = sequelize.models;

// Relaciones DB

Evaluacion.belongsTo(Cleaner);
CalendarEventsReq.belongsTo(Cliente)
Cliente.hasMany(CalendarEventsReq);
CalendarEventsAsig.belongsTo(Cleaner);
Cleaner.hasOne(CalendarEventsAsig);
Cliente.hasMany(UbicacionCliente);
UbicacionCliente.belongsTo(Cliente);
Cleaner.hasMany(UbicacionCleaner);
UbicacionCleaner.belongsTo(Cleaner);

Cliente.hasMany(Pedidos);
Pedidos.belongsTo(Cliente);
Cleaner.hasMany(Pedidos);
Pedidos.belongsTo(Cleaner);

Cleaner.hasOne(CleanerStatus);
CleanerStatus.belongsTo(Cleaner);

Cliente.hasMany(Auto);
Auto.belongsTo(Cliente);



module.exports = {
  ...sequelize.models,
    db: sequelize,
}

//Importar Modelos y hacer las relaciones de la DB