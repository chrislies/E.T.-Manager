const Sequelize = require('sequelize');
const db = require('../db');

const Course = db.define("course", {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  timeslot: {
    type: Sequelize.STRING
  },

  location: {
    type: Sequelize.STRING
  },

  // isOpen: {
  //   type: Sequelize.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: true
  // }

});

module.exports = Course;