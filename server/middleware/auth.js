// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error('Auth error:', err); // Вывод ошибки аутентификации
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;

/*

*/