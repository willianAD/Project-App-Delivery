module.exports = {
  async up(queryInterface, Sequelize) {
   return queryInterface.createTable('sales_products', {
    sale_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      foreingnKey: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: { model: 'sales', key: 'id' },
    },
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      foreingnKey: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: { model: 'products', key: 'id' },
    },
    quantity: { allowNull: false, type: Sequelize.INTEGER },
   });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('sales_products');
  },
};
