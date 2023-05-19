const express = require('express');
const router = express.Router();
const { Course, Instructor } = require('../database/models');

// helper function so we don't need to wrap our
// handler functions in try-catch blocks;
// the async handler will catch any errors and pass
// them to the error-handling middleware (defined in app.js)
const ash = require('express-async-handler');

/** GET ALL INSTRUCTORS */
router.get('/', ash(async(req, res) => {
  let instructors = await Instructor.findAll({include: [Course]});
  res.status(200).json(instructors);
}));

/** GET INSTRUCTOR BY ID*/
router.get('/:id', ash(async(req, res) => {
  let instructor = await Instructor.findByPk(req.params.id, {include: [Course]});
  res.status(200).json(instructor);
}));

// Delete instructor
router.delete('/:id', ash(async(req, res) => {
  await Instructor.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json("Instructor deleted");
}));

// Add new instructor
router.post('/', ash(async(req, res) => {
  let newInstructor = await Instructor.create(req.body);
  res.status(200).json(newInstructor);
}));

// Edit instructor
router.put('/:id', ash(async(req, res) => {
  await Instructor.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  let instructor = await Instructor.findByPk(req.params.id, {include: [Course]});
  res.status(201).json(instructor);
}))

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;