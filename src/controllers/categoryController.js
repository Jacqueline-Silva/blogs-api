const categoryService = require('../services/categoryService');

const categoryController = {
  addCategory: async (req, res) => {
    const data = req.body;

    await categoryService.validateBody(data);
    await categoryService.checkIfExists(data.name);

    const newCategory = await categoryService.addCategory(data.name);

    res.status(201).json(newCategory);
  },

  getAllCategories: async (_req, res) => {
    const categories = await categoryService.getAllCategories();

    res.status(200).json(categories);
  },
};

module.exports = categoryController;