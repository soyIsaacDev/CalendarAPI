const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "CiudadPais", 
    {
        Ciudad:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Estado:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        Pais:{
            type: DataTypes.STRING,
            allowNull: true 
        }
        
    }, {
    timestamps: false,
    });
}