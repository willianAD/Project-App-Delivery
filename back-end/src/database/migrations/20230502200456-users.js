module.exports = {
  async up(queryInterface, Sequelize) {
   return queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: { allowNull: false, type: Sequelize.STRING },
    email: { allowNull: false, type: Sequelize.STRING, unique: true },
    password: { allowNull: false, type: Sequelize.STRING },
    role: { allowNull: false, type: Sequelize.STRING },
   });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('users');
  },
};
