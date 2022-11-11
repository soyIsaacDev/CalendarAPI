const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "UserData", 
    {
        Usuario:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Email:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Contraseña:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        
    }, {
    timestamps: false,
    });
}