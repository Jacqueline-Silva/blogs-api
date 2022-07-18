require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    
    return token;
  },

  verifyToken: (token) => {
    try {
      const { data: { id } } = jwt.verify(token, process.env.JWT_SECRET);
      return id;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error; 
    }
  },
};

module.exports = jwtService; 