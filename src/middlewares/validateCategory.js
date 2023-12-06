const validateCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: '"name" is required' });
  }

  req.validatedBody = { name };

  next();
};

module.exports = { 
  validateCategory,
};