module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { 
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  },
  {
    tableName: 'Categories',
    timestamps: false,
  });

  // Category.associate = (models) => {
  //   Category.hasMany(models.PostCategory,
  //     { foreignKey: 'categoryId', as: 'PostCategory' });
  // };
  
  return Category;
};