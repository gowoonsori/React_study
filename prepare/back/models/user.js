const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model{
  static init(sequelize){
    return super.init({
      id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
      },
      email : {
        type : DataTypes.STRING(30),
        allowNull: false,          // false ==> 필수 , true ==> 선택
        unique : true,             // 고유한 값
      },
      nickname : {
        type : DataTypes.STRING(20),
        allowNull: false,          // false ==> 필수 , true ==> 선택
      },
      password : {
        type : DataTypes.STRING(100),
        allowNull: false,          // false ==> 필수 , true ==> 선택
      },
    }, {
      modelName : 'User',
      tableName : 'users',
      charset : 'utf8',
      collate : 'utf8_general_ci',
      sequelize,
    });
  }

  static associate(db){
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through : 'Like' , as : 'Liked'});
    db.User.belongsToMany(db.User, { through : 'Follow' , as :  'Followings', foreignKey : 'FollowingId'});
    db.User.belongsToMany(db.User, { through : 'Follow' , as :  'Followers', foreignKey : 'FollowerId'});
  }
};