const Sequelize = require('sequelize');
const db = require('../db');

const Instructor = db.define("instructor", {

  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  department: {
    type: Sequelize.STRING,
  },

  imageUrl: {
    type: Sequelize.STRING,
  }


});

module.exports = Instructor;