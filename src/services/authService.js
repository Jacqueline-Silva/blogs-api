const Joi = require('joi');
const { User } = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateBody: async (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.message = 'Some required fields are missing';
      error.name = 'ValidationError';
      throw error;
    }

    return value;
  },

  login: async (email, password) => {
    // findOne, procura um
    const user = await User.findOne({ where: { email } });

    if (user === null || user.password !== password) {
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      throw e;
    }

    const { passwordHash, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },
};

module.exports = authService;