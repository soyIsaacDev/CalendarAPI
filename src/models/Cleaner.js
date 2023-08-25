const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Cleaner", 
    {
        Nombre:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Apellido:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Usuario:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true 
        },
        Email:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Contraseña:{
            type: DataTypes.STRING,
            allowNull: false 
        }, 
        PromEvaluacion:{
            type: DataTypes.FLOAT,
            allowNull:true
        },
        NotificationToken:{
            type: DataTypes.STRING,
            allowNull:true
        },
    }, {
    timestamps: false,
    });
}