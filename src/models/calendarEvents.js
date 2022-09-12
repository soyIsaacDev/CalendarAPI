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
            allowNull:false,
        },
        end: {
            type:DataTypes.DATE,
            allowNull:false,
        },
        showStart:{
            type: DataTypes.VIRTUAL,
            get(){
                var options = { year: 'numeric', month: 'long', day: 'numeric', 
                    hour:'numeric', minute: 'numeric',  timeZone: 'America/Hermosillo' };
                const rawValue = this.getDataValue('start');
                return rawValue.toLocaleString('es-MX', options);
            }
        },
        showEnd: {
            type: DataTypes.VIRTUAL,
            get(){
                var options = { year: 'numeric', month: 'long', day: 'numeric', 
                    hour:'numeric', minute: 'numeric',  timeZone: 'America/Hermosillo' };
                const rawValue = this.getDataValue('end');
                return rawValue.toLocaleString('es-MX', options);
            }
        },
        colorId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
    timestamps: false,
    });
}