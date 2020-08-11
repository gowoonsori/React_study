const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends Model{
  static init(sequelize){
    return super.init({
      id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,          // false ==> 필수 , true ==> 선택
      },
    }, {
      modelName : 'Hashtag',
      tableName : 'hashtags',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    });
  }

  static associate(db){
    db.Hashtag.belongsToMany(db.Post, {through : 'PostHashtag'});
  }
};
