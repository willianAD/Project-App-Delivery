module.exports = {
  async up(queryInterface, Sequelize) {
   return queryInterface.createTable('sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: 'user_id',
      foreingnKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    sellerId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      field: 'seller_id',
      foreingnKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    totalPrice: { allowNull: false, type: Sequelize.DECIMAL(10, 2), field: 'total_price' },
    deliveryAddress: { allowNull: false, type: Sequelize.STRING, field: 'delivery_address' },
    deliveryNumber: { allowNull: false, type: Sequelize.STRING, field: 'delivery_number' },
    saleDate: { allowNull: false, type: Sequelize.DATE, field: 'sale_date' },
    status: { allowNull: false, type: Sequelize.STRING },
   });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('sales');
  },
};
