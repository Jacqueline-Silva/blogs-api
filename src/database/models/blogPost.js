module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    published: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  }, 
  {
    tableName: 'BlogPosts',
    timestamps: false
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'User' });
  };
  
  return BlogPost;
};