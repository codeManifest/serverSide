const jwt = require('jsonwebtoken')
const User = require('../models/user');
const dotenv = require('dotenv');
 dotenv.config()
 const JWT_secret= process.env.JWT_SECRET

exports.registerUser = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const newUser = new user({ userName, password, email });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' }); // Fixed typo
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
      res.status(500).json({ message: 'something wrong in Server !  Please contact DEV.' });
    }
  }
}










// Login user code
exports.loginUsers = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token with user details
    const token = jwt.sign(
      { userId: user._id, userName: user.userName }, 
      JWT_secret, 
      { expiresIn: '1h' } // You can adjust the expiration time as needed
    );

    // Send the token in the response
    res.status(200).json({
      message: 'Login successful',
      token: token // Include the token in the response
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
