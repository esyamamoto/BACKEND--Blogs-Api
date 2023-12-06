const jwt = require('jsonwebtoken');
const { userService, userServiceFind, userServiceFindById } = require('../services/userService');

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

const userControllerFind = async (_req, res) => {
  try {
    const { status, data } = await userServiceFind();
    if (data.length === 0) {
      return res.status(status).json({ message: 'No users found' });
    }
    res.status(status).json(data);
  } catch (error) {
    console.error('Error retrieving users:', error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const userControllerFindById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await userServiceFindById({ id });
    if (data.length === 0) {
      return res.status(status).json({ message: 'User does not exist' });
    }
    res.status(status).json(data);
  } catch (error) {
    console.error('Error retrieving users:', error);

    res.status(404).json({ message: 'User does not exist' });
  }
};

module.exports = {
  userController,
  userControllerFind,
  userControllerFindById,
};