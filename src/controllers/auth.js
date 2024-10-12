const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

exports.signup = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { email, name, password } = req.body;

  const hashedPw = await bcrypt.hash(password, 12);

  const user = new User({
    email: email,
    password: hashedPw,
    name: name
  });
  const result = await user.save();

  res.status(201).json({ message: 'User created!', userId: result._id });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error('A user with this email could not be found.');
    error.statusCode = 401;
    throw error;
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = new Error('Wrong password!');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString()
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.status(200).json({ token: token, userId: user._id.toString() });
});
