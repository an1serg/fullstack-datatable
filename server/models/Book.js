const Sequelize = require('sequelize');
const db = require('../config/database');
const Person = require('./Person');

const Book = db.define(
  'book',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    createdat: {
      type: Sequelize.DATE,
    },
    price: {
      type: Sequelize.NUMBER,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: 'person',
      referencesKey: 'id',
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Book;
