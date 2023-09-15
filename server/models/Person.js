const Sequelize = require('sequelize');
const db = require('../config/database');

const Person = db.define(
  'person',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    surname: {
      type: Sequelize.STRING,
    },
    createdat: {
      type: Sequelize.DATE,
    },
    salary: {
      type: Sequelize.NUMBER,
    },
    vacationdays: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Person;
