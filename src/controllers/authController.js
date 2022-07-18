const authService = require('../services/authService');
const jwtService = require('../services/jwtService');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    await authService.validateBody(req.body);

    const token = await authService.login(email, password);

    res.status(200).json({ token });
  },

  verifyToken: async (req, _res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      const error = new Error('Token not found');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const id = jwtService.verifyToken(token);
    req.userId = id;

    next();
  },
};

module.exports = authController; 