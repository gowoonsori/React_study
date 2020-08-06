module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
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
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);

  };
  return Image;
};