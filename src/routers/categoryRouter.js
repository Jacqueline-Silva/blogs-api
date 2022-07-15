const { Router } = require('express');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

const router = Router();

router.use(authController.verifyToken);

router.post('/', categoryController.addCategory);

router.get('/', categoryController.getAllCategories);

module.exports = router;