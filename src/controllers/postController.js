const PostService = require('../services/postService');
const categoryService = require('../services/categoryService');

const PostController = {
  addBlogPost: async (req, res) => {
    const data = req.body;
    const { userId } = req;
    
    await PostService.validateBody(data);

    await Promise.all(data.categoryIds.map(async (id) => 
    categoryService.checkIfExistsById(id)));

    const post = { userId, ...data };
    const newBlogPost = await PostService.addBlogPost(post);

    res.status(201).json(newBlogPost);
  },

  getAll: async (_req, res) => {
    const all = await PostService.getAll();

    res.status(200).json(all);
  },

  getById: async (req, res) => {
    const { id } = req.params;

    await PostService.checkIfExistsById(id);
    
    const blogById = await PostService.getById(+id);

    res.status(200).json(blogById);
  },
};

module.exports = PostController;