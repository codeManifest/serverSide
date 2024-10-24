const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { 
    type: String,
    
  },
  fatherName: {
    type: String,
    
  },
  motherName: {
    type: String,
    
  } ,
  Class: {
    type: String,
    
  } ,
  rollNumber:{
    type: String,
    
  },
  Section:{
    type: String,
    
  },
  Addressline1:{
    type: String,
    
  },
  Addressline2:{
    type: String,
    
  },
  Pin:{
    type: String,
    
    
  },
  District:{
    type: String,
    // required: true,
    
  }



  //  password hasing // <
});



// login code







// Method to compare passwords


const studentRecord = mongoose.model('studentRecord', studentSchema); // <-- Capitalization issue

module.exports = studentRecord
