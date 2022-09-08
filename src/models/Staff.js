const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Staff", 
    {
        Nombre:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Apellido_p:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Apellido_m:{
            type: DataTypes.STRING,
            allowNull: false
        }, 
        Edad:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Ciudad_Residencia:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
        /* ,
        ubicacionCasa:{
            type: DataTypes.STRING,
            allowNull: false,
        } */
    }, {
    timestamps: false,
    });
}