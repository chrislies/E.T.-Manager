// register models, set up associations between tables, and generate barrel file for the models;

const Course  = require('./Course');
const Instructor  = require('./Instructor');

Course.belongsTo(Instructor);
Instructor.hasMany(Course);

module.exports = {
  Course,
  Instructor
};