const { Router } = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = Router();

router.use(authController.verifyToken);

router.get('/', postController.getAll);

router.get('/:id', postController.getById);

router.post('/', postController.addBlogPost);

module.exports = router;