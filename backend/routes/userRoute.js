const express = require('express');
const { getAllUsersHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', getAllUsersHandler);
userRouter.get('/:id', getUserByIdHandler);
userRouter.put('/:id', updateUserHandler);
userRouter.delete('/:id', deleteUserHandler);

module.exports = userRouter;