const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Cliente", 
    {
        googleId:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        Usuario:{
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        Nombre:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Apellido:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Email:{
            type: DataTypes.STRING
        }
    }, {
    timestamps: false,
    });
}