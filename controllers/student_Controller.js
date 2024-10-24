const student = require('../models/student_Records');



exports.studentRecord= async (req, res)=>{
  
    try {
        const { fullName, fatherName, motherName, Class, rollNumber, Section, Addressline1, Addressline2, Pin, District } = req.body;
        const newStudent = new student({ fullName, fatherName, motherName, Class, rollNumber, Section, Addressline1, Addressline2, Pin, District });
        await newStudent.save();
        res.status(201).json({ message: 'Saved' }); 
      } catch (err) {
        if (err.name === 'ValidationError') {
          // Handle validation errors
    
    
          const messages = Object.values(err.errors).map(val => val.message);
          res.status(400).json({ message: messages.join(', ') });
        } else if (err.code && err.code === 11000) {
          // Handle duplicate key errors
          const field = Object.keys(err.keyValue);
          res.status(400).json({ message: `${field} already exists` });
        } else {
          // Handle other errors
          res.status(500).json({ message: 'Server Timeout()' });
        }
      }
    }
    
    
    
    
    
    
    
    
    
   
    
