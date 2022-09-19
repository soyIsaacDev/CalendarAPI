const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbEngine = process.env.DB_ENGINE;
const dbUserName = process.env.DB_USER;
const dbPasword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME

const connectionString = `${dbEngine}://${dbUserName}:${dbPasword}@${dbHost}:${dbPort}/${dbName}`;
const sequelize = new Sequelize(connectionString, {
  logging: false, //Loging Deshabilitado,
});

try {
  sequelize.authenticate();
  console.log("Conexion a la Base de Datos Exitosa.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

//Modelos DB

const modelStaff = require("./models/Staff");
const modelEvaluacion = require("./models/Evaluacion");
const modelCalendarEventsAsig = require("./models/calendarEventsAsig");
const modelCalendarEventReq = require("./models/calendarEventsReq");
const modelCliente = require("./models/Cliente");
const modelCitas = require("./models/citas");

//pasamos instancia de sequelize a los modelos
modelStaff(sequelize);
modelEvaluacion(sequelize);
modelCalendarEventsAsig(sequelize);
modelCalendarEventReq(sequelize);
modelCliente(sequelize);
modelCitas(sequelize);

let {Staff, Evaluacion, CalendarEventsAsig, CalendarEventsReq, Cliente, Citas} = sequelize.models;

// Relaciones DB

Evaluacion.belongsTo(Staff);
CalendarEventsReq.belongsTo(Cliente)
Cliente.hasMany(CalendarEventsReq);
CalendarEventsAsig.belongsTo(Staff);
Staff.hasOne(CalendarEventsAsig);

module.exports = {
  ...sequelize.models,
    db: sequelize,
}

//Importar Modelos y hacer las relaciones de la DB