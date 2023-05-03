module.exports = {
  async up(queryInterface, Sequelize) {
   return queryInterface.createTable('sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      foreingnKey: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: {
        model: 'users',
        key: 'id',
      },
    },
    seller_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      foreingnKey: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: {
        model: 'users',
        key: 'id',
      },
    },
    total_price: { allowNull: false, type: Sequelize.DECIMAL(10, 2) },
    delivery_address: { allowNull: false, type: Sequelize.STRING },
    delivery_number: { allowNull: false, type: Sequelize.STRING },
    sale_date: { allowNull: false, type: Sequelize.DATE },
    status: { allowNull: false, type: Sequelize.STRING },
   });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('sales');
  },
};
