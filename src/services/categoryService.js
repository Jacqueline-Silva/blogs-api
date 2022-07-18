const Joi = require('joi');
const { Category } = require('../database/models');

const categoryService = {
  validateBody: async (data) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.name = 'ValidationError';
      throw error;
    }

    return value;
  },

  checkIfExists: async (name) => {
    const category = await Category.findOne({ 
      where: { name }, 
    });

    if (category) {
      const e = new Error('Category already registered');
      e.name = 'ConflictError';
      throw e;
    }
  },

  checkIfExistsById: async (id) => {
    const category = await Category.findOne({ 
      where: { id }, 
    });

    if (!category) {
      const e = new Error('"categoryIds" not found');
      e.name = 'ValidationError';
      throw e;
    }
  },

  addCategory: async (name) => {
    const newCategory = await Category.create({
      name,
    });

    return newCategory;
  },

  getAllCategories: async () => {
    const categories = await Category.findAll();

    return categories;
  },
};

module.exports = categoryService;