const { Router } = require('express');
const UserController = require('../controllers/userController');

const router = Router();

router.post('/', UserController.addUser);

module.exports = router;