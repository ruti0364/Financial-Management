const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');  
 
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      
      return res.status(401).json({ error: 'Invalid password or Email' });
    }

     
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password or Email' });

    }

     
    return res.status(200).json({
      message: 'User registered successfully',
      userId: newUser._id
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;