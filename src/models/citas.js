const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "Citas", 
    {
        StaffID:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ClienteId:{
            type: DataTypes.INTEGER,
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
        ubicacion:{
            // compuesta por lat y long
            type: DataTypes.JSON,
            allowNull: false,     
        }
    }, {
    timestamps: false,
    });
}