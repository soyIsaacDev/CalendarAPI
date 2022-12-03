const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Evaluacion", 
    {
        Calificacion:{
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
    timestamps: false,
    });
}