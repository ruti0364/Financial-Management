// const User = require('../models/User');

// // מחזיר את פרטי המשתמש המחובר
// exports.getMe = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json(user);
//   } catch (err) {
//     console.error('Error in getMe:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // עדכון פרטי המשתמש
// exports.updateProfile = async (req, res) => {
//   try {
//     const { firstName, lastName, email } = req.body;
//     const updates = { firstName, lastName, email };

//     const user = await User.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true }).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json(user);
//   } catch (err) {
//     console.error('Error in updateProfile:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const User = require('../models/User');
const bcrypt = require('bcrypt');

// קבלת המשתמש המחובר
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('GetMe error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// עדכון פרופיל כולל סיסמה
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, oldPassword, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    if (oldPassword && password) {
      const isMatch = await bcrypt.compare(oldPassword.trim(), user.password);
      if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });
  } catch (err) {
    console.error('UpdateProfile error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
