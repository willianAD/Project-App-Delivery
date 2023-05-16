// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    sellerId: { type: DataTypes.INTEGER },
    totalPrice: { type: DataTypes.DECIMAL(10, 2) },
    deliveryAddress: { type: DataTypes.STRING },
    deliveryNumber: { type: DataTypes.STRING },
    saleDate: { type: DataTypes.DATE,
    defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'sales',
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      targetKey: 'id',
      as: 'user',
    });
  
  Sale.belongsTo(models.User, {
      foreignKey: {
        name: 'sellerId',
        allowNull: false,
      },
      targetKey: 'id',
      as: 'seller',
    });
    };

  return Sale;
};
