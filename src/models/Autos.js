const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Auto", 
    {
        Tamaño:{
            type: DataTypes.ENUM('Grande', 'Chico'),
            allowNull: false 
        },
        Nombre:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    timestamps: false,
    });
}