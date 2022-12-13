const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Pedidos", 
    {
        
        kind:{
            type: DataTypes.STRING,
            allowNull: false
        },
        colorId:{
            type: DataTypes.INTEGER
        },
        auto: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        start: {
            type:DataTypes.DATE,
            allowNull:false,
        },
        end: {
            type:DataTypes.DATE,
            allowNull:true,
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
            set(value){
                if(value<0){
                    value = value * -1;
                    this.setDataValue('ubicacionLong', value);
                } else {
                    this.setDataValue('ubicacionLong', value);
                }
            } 
        },
        UbicacionSum:{
            type: DataTypes.FLOAT,
            get() {
                const sumaLoc = this.getDataValue('ubicacionLat') + this.getDataValue('ubicacionLong')
                return sumaLoc;
            },
            set(value){
                const sumaUbic = this.getDataValue('ubicacionLat') + this.getDataValue('ubicacionLong')
                this.setDataValue('UbicacionSum', value + sumaUbic );
            }
        },
        Terminado:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    }, {
    timestamps: false,
    });
}