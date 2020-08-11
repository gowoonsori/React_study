const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model{
  static init(sequelize){
    return super.init({
      id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
      },
      src : {
        type : DataTypes.STRING(200),
        allowNull: false,          // false ==> 필수 , true ==> 선택
      },
    }, {
      modelName : 'Image',
      tableName : 'images',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize,
    });
  }

  static associate(db){
    db.Image.belongsTo(db.Post);
  }
};