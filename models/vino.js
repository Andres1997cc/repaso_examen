module.exports = function (sequelize, Sequelize) {
    var model = require('../models/region');
    var Region = new model(sequelize, Sequelize);
    var Vino = sequelize.define('vino', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre:{
          type: Sequelize.STRING (200),
          notEmpty: true
        },
        anio:{
          type: Sequelize.INTEGER,
          notEmpty: true
        },
        descripcion:{
          type: Sequelize.STRING (300),
          notEmpty: true
        },
        uva:{
          type: Sequelize.STRING (100),
          notEmpty: true
        },    
        exteral_id:{
            type: Sequelize.UUID
        }
    });
    Vino.belongsTo(Region, {foreignKey: 'id_region', constraints: false});
    return Vino;
};







