module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    sellerId: { type: DataTypes.INTEGER },
    totalPrice: { type: DataTypes.DECIMAL(10, 2) },
    deliveryAddress: { type: DataTypes.STRING },
    deliveryNumber: { type: DataTypes.STRING },
    saleDate: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'sales',
  });

  Sale.associate = (models) => {
    Sale.belongsToMany(models.User, 
      {
        as: 'user',
        through: Sale,
        foreignKey: 'userId',
        otherKey: 'id',
      },
      {
        as: 'seller',
        through: Sale,
        foreignKey: 'sellerId',
        otherKey: 'id',
      });
  }

  return Sale;
};
