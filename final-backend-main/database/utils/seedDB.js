const { Instructor, Course } = require('../models');

const seedDB = async () => {
	const dummyInstructor = await Instructor.create({
		firstname: "Melissa",
		lastname: "Lynch",
		department: "Computer Science"
	});
	const dummyInstructor2 = await Instructor.create({
		firstname: "Kim",
		lastname: "Kardashian"
	});

	const dummyCourse = await Course.create({
		title: "CSCI 39548",
        location: "C107",
        timeslot: "W 5:35 - 8:15 PM"
	});

	await dummyCourse.setInstructor(dummyInstructor);
	
}

module.exports = seedDB;