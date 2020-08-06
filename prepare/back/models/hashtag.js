module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {
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
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, {through : 'PostHashtag'});
  };
  return Hashtag;
};