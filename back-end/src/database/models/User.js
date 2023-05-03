module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'users',
  });

  User.associate = (models) => {
    User.hasMany(models.Sales,
      { foreignKey: 'user_id', as: 'Sales' });
  };

  User.associate = (models) => {
    User.hasMany(models.Sales,
      { foreignKey: 'seller_id', as: 'Sales' });
  };

  return User;
};
