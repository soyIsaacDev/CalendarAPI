const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "UbicacionCleaner", 
    {
        UbicacionLat:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        UbicacionLong:{
            type: DataTypes.FLOAT,
            allowNull: false,
            set(value){
                if(value<0){
                    value = value * -1;
                    this.setDataValue('UbicacionLong', value);
                } else {
                    this.setDataValue('UbicacionLong', value);
                }
            }
        },
        UbicacionCasaSum:{
            type: DataTypes.FLOAT,
            get() {
                const sumaLoc = this.getDataValue('UbicacionLat') + this.getDataValue('UbicacionLong')
                return sumaLoc;
            },
            set(value){
                const sumaLoc = this.getDataValue('UbicacionLat') + this.getDataValue('UbicacionLong')
                this.setDataValue('UbicacionCasaSum', value + sumaLoc );
            }
        }
        
    }, {
    timestamps: false,
    });
}