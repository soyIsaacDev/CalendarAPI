const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "ServiciosOfrecidos", 
    {
        TipoDeServicio:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        TamañoAuto:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Precio:{
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
    timestamps: false,
    });
}