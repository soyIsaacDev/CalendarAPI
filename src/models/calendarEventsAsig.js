const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "CalendarEventsAsig", 
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
            set(value){
                if(this.start < value){
                    this.setDataValue('end',value);
                }
            }
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
                if (rawValue){
                    return rawValue.toLocaleString('es-MX', options);
                }
            }
        },
        ubicacionLat:{
            type: DataTypes.FLOAT,
            allowNull: false,     
        },
        ubicacionLong:{
            type: DataTypes.FLOAT,
            allowNull: false,     
        },
        /* ubicacionSum:{
            type: DataTypes.FLOAT,
            get(){
                const sumUbicacion = this.ubicacionLat + this.ubicacionLong *(-1);
                return sumUbicacion;
            },
            set(sumUbicacion){
                this.setDataValue('UbicacionSum', sumUbicacion);
            }
        }, */
        colorId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
    timestamps: false,
    });
}