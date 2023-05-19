const express = require('express');
const router = express.Router();

// Subrouters;
const coursesRouter = require('./courses');
const instructorsRouter = require('./instructors');

// Mount our subrouters to assemble our apiRouter;
router.use('/courses', coursesRouter);
router.use('/instructors', instructorsRouter);

// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;