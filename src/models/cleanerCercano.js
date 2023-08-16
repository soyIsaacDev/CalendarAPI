const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "CleanerCercano", 
    {
        CleanerId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TiempoxDesocupar:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Distancia:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DistLat:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DistLong:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        TiempoDeLlegada:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PromEvaluacion:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
    }, {
    timestamps: false,
    });
}