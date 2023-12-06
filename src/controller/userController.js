const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const key = process.env.JWT_SECRET || 'yourSecretToken';

const userController = async (req, res) => {
  try {
    const { status, data } = await userService(req.body);  
    
    if (status === 400) return res.status(status).json({ message: data });
    const payload = {
      id: data.id,
      email: data.email,
    };

    const token = jwt.sign(payload, key, {
      expiresIn: '7d',
    });
    return res.status(status).json({ token });
  } catch (error) {
    console.error('Error in userController:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  userController,
};