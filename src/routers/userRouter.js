const { Router } = require('express');
const authController = require('../controllers/authController');
const UserController = require('../controllers/userController');

const router = Router();

router.post('/', UserController.addUser);

router.use(authController.verifyToken);

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.findByUser);

module.exports = router;