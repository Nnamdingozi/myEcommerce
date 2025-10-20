// src/routes/userRoutes.ts

import express from 'express';
import {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/userController';

const userRouter = express.Router();


userRouter.get('/', getAllUsersHandler);
userRouter.get('/:id', getUserByIdHandler);

userRouter.put('/:id', updateUserHandler);
userRouter.delete('/:id', deleteUserHandler);

export default userRouter;