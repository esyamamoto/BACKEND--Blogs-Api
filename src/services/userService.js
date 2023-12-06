const db = require('../models');

const userService = async ({ displayName, email, password, image }) => {
  try {
    if (password.length < 6) { 
      return { 
        status: 400, data: '"password" length must be at least 6 characters long' }; 
    }
    if (displayName.length < 8) { 
      return { 
        status: 400, data: '"displayName" length must be at least 8 characters long' }; 
    }
    const response = await db.User.create({ displayName, email, password, image });
    return { status: 201, data: response };
  } catch (error) {
    console.error('Error in userService:', error);
    return { status: 500, data: 'Internal Server Error' };
  }
};

module.exports = userService;
