const jwt = require('jsonwebtoken');
const { loginService } = require('../services/loginService');

const key = process.env.JWT_SECRET || 'yourSecretToken';

const loginController = async (req, res) => {
  try {
    const { status, data } = await loginService(req.body);

    if (data.message) {
      return res.status(status).json(data);
    }

    const payload = {
      id: data.id,
      email: data.email,
    };

    const token = jwt.sign(payload, key, {
      expiresIn: '7d',
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error in loginController:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  loginController,
};
