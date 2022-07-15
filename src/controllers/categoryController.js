const categoryService = require('../services/categoryService');

const categoryController = {
  addCategory: async (req, res) => {
    const data = req.body;

    await categoryService.validateBody(data);
    await categoryService.checkIfExists(data.name);

    const newCategory = await categoryService.addCategory(data.name);

    res.status(201).json(newCategory);
  },
};

module.exports = categoryController;