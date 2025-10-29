const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const signToken = (user) => jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });


exports.register = async (req, res, next) => {
try{
const errors = validationResult(req);
if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { name, email, password } = req.body;
let user = await User.findOne({ email });
if(user) return res.status(400).json({ message: 'User already exists' });


user = new User({ name, email, password });
await user.save();
const token = signToken(user);
res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch(err){ next(err); }
};


exports.login = async (req, res, next) => {
try{
const errors = validationResult(req);
if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { email, password } = req.body;
const user = await User.findOne({ email });
if(!user) return res.status(400).json({ message: 'Invalid credentials' });
const isMatch = await user.comparePassword(password);
if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
const token = signToken(user);
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch(err){ next(err); }
};

// Compatibility exports expected by routes
exports.registerUser = exports.register;
exports.loginUser = exports.login;

// Return current user info (set by auth middleware)
exports.getMe = (req, res) => {
	if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
	// req.user contains token payload (id, email)
	res.json({ id: req.user.id, email: req.user.email });
};