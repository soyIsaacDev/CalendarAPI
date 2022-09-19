const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Cliente", 
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
        },
        UbicacionCasaLat:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        UbicacionCasaLong:{
            type: DataTypes.FLOAT,
            allowNull: false,
            set(value){
                if(value<0){
                    value = value * -1;
                    this.setDataValue('UbicacionCasaLong', value);
                } else {
                    this.setDataValue('UbicacionCasaLong', value);
                }
            }
        },
        UbicacionCasaSum:{
            type: DataTypes.FLOAT,
            get() {
                const sumaLoc = this.getDataValue('UbicacionCasaLat') + this.getDataValue('UbicacionCasaLong')
                return sumaLoc;
            },
            set(value){
                const sumaLoc = this.getDataValue('UbicacionCasaLat') + this.getDataValue('UbicacionCasaLong')
                this.setDataValue('UbicacionCasaSum', value + sumaLoc );
            }
        }
    }, {
    timestamps: false,
    });
}