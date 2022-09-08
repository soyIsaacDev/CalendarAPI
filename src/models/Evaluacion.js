const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Evaluacion", 
    {
        Evaluacion:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    timestamps: false,
    });
}