const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Sessions", 
    {
        sid:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        expire:{
            type: DataTypes.DATE
        },
        data:{
            type: DataTypes.TEXT
        },
        sess:{
            type: DataTypes.STRING
        },
    }, {
    timestamps: false,
    });
}