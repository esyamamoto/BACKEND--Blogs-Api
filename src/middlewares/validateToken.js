const jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || 'yourSecretToken';

function tokenThunder(bearerToken) {
  return bearerToken.split(' ')[1]; // testar thunder, pula a palavra bearer
}

const tokenOK = async (req, res, next) => {
  const bearerToken = req.header('Authorization'); // portador do token

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = tokenThunder(bearerToken);

  try {
    const payload = jwt.verify(token, key);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  tokenOK,
};