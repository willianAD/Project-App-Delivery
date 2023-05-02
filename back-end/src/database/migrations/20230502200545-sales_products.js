module.exports = {
  async up(queryInterface, Sequelize) {
   return queryInterface.createTable('sales_products', {
    saleId: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      field: 'sale_id',
      foreingnKey: true,
      references: { model: 'sales', key: 'id' },
    },
    productId: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      field: 'product_id',
      foreingnKey: true,
      references: { model: 'products', key: 'id' },
    },
    quantity: { allowNull: false, type: Sequelize.INTEGER },
   });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('sales_products');
  },
};
