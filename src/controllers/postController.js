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
};

module.exports = PostController;