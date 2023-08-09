const {DataTypes} = require ('sequelize');

module.exports = s => {
    s.define(
      "ImgCliente", 
      {
      type: {
        type: DataTypes.STRING,
      },
      img_name: {
        type: DataTypes.STRING,
      }
    });
  
  };