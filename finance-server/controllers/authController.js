const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const token = createToken(user._id);
    res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user._id);
    res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

// Optional - לקבלת מידע על המשתמש מתוך הטוקן בקוקי
exports.getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
