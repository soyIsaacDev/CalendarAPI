const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Auto", 
    {
        Tamaño:{
            type: DataTypes.STRING,
            allowNull: false 
        }
    }, {
    timestamps: false,
    });
}