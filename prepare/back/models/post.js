module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id : {
      type : DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true,
    },
    content : {
      type : DataTypes.TEXT,
      allowNull : false,
    },
  },  {
    modelName: 'Post',
    tableName: 'posts',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
    sequelize,
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag,{through : 'PostHashtag'});
    db.Post.belongsToMany(db.User, { through : 'Like', as : 'Likers'});
    db.Post.belongsTo(db.Post, { as : 'Retweet'});
  };
  return Post;
};