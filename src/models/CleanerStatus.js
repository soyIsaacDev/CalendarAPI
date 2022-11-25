const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "CleanerStatus", 
    {
        Status:{
            type: DataTypes.ENUM,
            values: ['activo', 'inactivo', 'enservicio']
        },
        TiempoxDesocupar:{
            type: DataTypes.INTEGER,
        }
    }, {
    timestamps: false,
    });
}