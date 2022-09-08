const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "CalendarEvents", 
    {
        kind:{
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            type:DataTypes.DATE,
            allowNull:false
        },
        end: {
            type:DataTypes.DATE,
            allowNull:false
        },
        colorId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
    timestamps: false,
    });
}