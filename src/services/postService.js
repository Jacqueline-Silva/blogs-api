const Joi = require('joi');
const { BlogPost, User, Category, sequelize, PostCategory } = require('../database/models');

const PostService = {
  validateBody: async (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required(),
    });
  
    const { error, value } = schema.validate(data);

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }

    return value;
  },

  checkIfExistsById: async (id) => {
    const postId = await BlogPost.findOne({ 
      where: { id }, 
    });

    if (!postId) {
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
  },

  addBlogPost: async (data) => {
    const { categoryIds, userId, title, content } = data;

    const result = await sequelize.transaction(async (t) => {
      const newBlogPost = await BlogPost.create({ 
        userId, title, content,
      }, { transaction: t });

      const postId = newBlogPost.dataValues.id;

      await Promise.all(
        categoryIds.map((categoryId) => PostCategory.create({
          postId, categoryId,
        }, { transaction: t })),
      );

      return newBlogPost.dataValues;
    });

    return result;
  },

   getAll: async () => {
    const all = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, 
          as: 'categories', 
          through: { attributes: [] },
        },
      ],
    });

    return all;
  },

  getById: async (id) => {
    const blogById = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return blogById;
  },
};

module.exports = PostService;