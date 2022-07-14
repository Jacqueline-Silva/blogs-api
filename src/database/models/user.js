module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { 
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,  
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'Users',
    timestamps: false,
  });

  // User.associate = (models) => {
  //   User.hasMany(models.BlogPosts,
  //     { foreignKey: 'userId', as: 'userPosts' });
  // };
  return User;
};