const db = require('../models');

const validateUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailOK = regex.test(email);

    if (!emailOK) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }

    const emailExist = await db.User.findOne({ where: { email } });
    if (emailExist) {
      return res.status(409).json({ message: 'User already registered' });
    } 
    next();
  } catch (error) {
    console.error('Error in validateUser:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  validateUser,
};
