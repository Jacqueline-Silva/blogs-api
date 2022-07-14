const UserService = require('../services/userService');

const UserController = {
  addUser: async (req, res) => {
    const data = req.body;

    await UserService.validateBody(data);
    await UserService.checkIfExists(data.email);

    const newUser = await UserService.addUser(data);

    res.status(201).json({ token: newUser });
  },

  getAllUsers: async (_req, res) => {
    const users = await UserService.getAllUsers();

    res.status(200).json(users);
  },
  
  findByUser: async (req, res) => {
    const { id } = req.params;
    const userId = await UserService.findByUser(id);

    res.status(200).json(userId);
  },
};

module.exports = UserController;