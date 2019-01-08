module.exports = function (sequelize, Sequelize) {
    
    var Region = sequelize.define('region', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre:{
          type: Sequelize.STRING (200),
          notEmpty: true
        },    
        exteral_id:{
            type: Sequelize.UUID
        }
    });
    Region.associate = function (models) {
        models.region.hasMany(models.vino,{
            foreignKey: 'id_region'
        });
    };    
    return Region;
};







