const express = require('express');
const student_router = express.Router();
// const studentController = require('../controllers/student_Controller');
const student = require("../models/student_Records");

student_router.put('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body; // Data to be updated

        // Update student data in the database
        const student = await student.findByIdAndUpdate(id, updatedData, { new: true });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student data updated successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student data', error });
    }
});

module.exports = student_router;


