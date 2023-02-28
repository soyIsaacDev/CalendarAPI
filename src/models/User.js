const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
        "User", 
    {
        googleId:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    timestamps: false,
    });
}