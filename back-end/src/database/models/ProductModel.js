module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(10, 2) },
    urlImage: { type: DataTypes.STRING },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'products',
  });

  return Product;
};
