const { Sequelize } = require('sequelize');

module.exports = new Sequelize('datatable', 'postgres', 'maximbet', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});
