const connection = require('../models');

// Sua aplicação deve ter o endpoint POST /categories
const categoryServiceCreated = async (name) => {
  try {
    const createdCategory = await connection.Category.create({ name });
    return createdCategory;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};
// ------------------------------------------------------------------------
// Sua aplicação deve ter o endpoint GET /categories
const categoryServiceFind = async (name) => {
  try {
    const category = await connection.Category
      .findAll({ where: name });
    return category;
  } catch (error) {
    console.error('Error retrieving category:', error);
    throw error;
  }
};

module.exports = {
  categoryServiceCreated,
  categoryServiceFind,
};