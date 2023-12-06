const db = require('../models');

const loginService = async ({ email, password }) => {
  try {
    const response = await db.User.findOne({ where: { email, password } });

    if (!response) {
      return { status: 400, data: { message: 'Invalid fields' } };
    }

    if (response.password !== password) {
      return { status: 400, data: { message: 'Invalid fields' } };
    }

    return { status: 200, data: response };
  } catch (error) {
    console.error('Error in loginService:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  loginService,
};