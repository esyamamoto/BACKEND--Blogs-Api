const { categoryServiceFind, categoryServiceCreated } = require('../services/categoryService');

// Sua aplicação deve ter o endpoint POST /categories
const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }

    const category = await categoryServiceCreated(name);

    return res.status(201).json(category);
  } catch (error) {
    console.error('Error retrieving category:', error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ------------------------------------------------------------------------
// Sua aplicação deve ter o endpoint GET /categories
const controllerCategoryFind = async (req, res) => {
  const { name } = req.body;
  
  try {
    const newCat = await categoryServiceFind(name);

    if (!newCat) {
      return res.status(500).json({ message: 'Error creating category' });
    }

    res.status(200).json(newCat);
  } catch (error) {
    console.error('Error creating category:', error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};
 
module.exports = {
  categoryController, 
  controllerCategoryFind,
};
