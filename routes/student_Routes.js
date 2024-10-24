const express = require('express');
const student_router = express.Router();
const studentController = require('../controllers/student_Controller');

// register user route


student_router.post('/studentRecord', studentController.studentRecord )


module.exports = student_router;
