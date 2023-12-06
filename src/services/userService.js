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

const userServiceFind = async () => {
  try {
    const userFind = await db.User.findAll({ attributes: { exclude: ['password'] } });
    return { status: 200, data: userFind };
  } catch (error) {
    console.error('Error retrieving users:', error);
    return { status: 500, data: 'Internal Server Error' };
  }
};

const userServiceFindById = async (id) => {
  const userFindId = await db.User
    .findOne({ where: id, attributes: { exclude: ['password'] } });
  return { status: 200, data: userFindId };
};

module.exports = {
  userService,
  userServiceFind,
  userServiceFindById,
};
