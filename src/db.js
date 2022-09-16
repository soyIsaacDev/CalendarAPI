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
const modelCalendarEventP = require("./models/calendarEventsP");
const modelCalendarEventA = require("./models/calendarEventsA");
const modelCliente = require("./models/Cliente");

modelStaff(sequelize);
modelEvaluacion(sequelize);
modelCalendarEventP(sequelize);
modelCalendarEventA(sequelize);
modelCliente(sequelize);

let {Staff, Evaluacion, CalendarEventsP, CalendarEventsA, Cliente} = sequelize.models;

// Relaciones DB

Evaluacion.belongsTo(Staff);
CalendarEventsP.belongsTo(Cliente)
Cliente.hasMany(CalendarEventsP);
CalendarEventsA.belongsTo(Staff);
Staff.hasOne(CalendarEventsA);

module.exports = {
  ...sequelize.models,
    db: sequelize,
}

//Importar Modelos y hacer las relaciones de la DB