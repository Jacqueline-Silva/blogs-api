const Joi = require('joi');
const { User } = require('../database/models');
const jwtService = require('./jwtService');

const UserService = {
  validateBody: async (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      displayName: Joi.string().required().min(8),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.name = 'ValidationError';
      throw error;
    }

    return value;
  },

  checkIfExists: async (email) => {
    const user = await User.findOne({ 
      where: { email }, 
    });

    if (user) {
      const e = new Error('User already registered');
      e.name = 'ConflictError';
      throw e;
    }
  },

  addUser: async ({ email, displayName, password, image }) => {
    const newUser = await User.create({
      email,
      displayName,
      password,
      image,
    });

    const { passwordHash, ...userWithoutPassword } = newUser.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },

  getAllUsers: async () => {
    const users = await User.findAll({ 
      attributes: { exclude: ['password'] },
    });

    return users;
  },
};

module.exports = UserService;