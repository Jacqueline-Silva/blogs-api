const UserService = require('../services/userService');

const UserController = {
  addUser: async (req, res) => {
    const data = req.body;

    await UserService.validateBody(data);
    await UserService.checkIfExists(data.email);

    const newUser = await UserService.addUser(data);

    res.status(201).json({ token: newUser });
  },
};

module.exports = UserController;