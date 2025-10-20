// src/controllers/userController.ts

import { Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} from '../services/userService';
import { handleErrorResponse } from '../lib/error/handleErrorResponse';

export const getAllUsersHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.query;
  
      // Case 1: An email query parameter is provided
      if (email) {
        if (typeof email !== 'string') {
          res.status(400).json({ error: 'The email query parameter must be a string.' });
          return;
        }
        const user = await getUserByEmail(email);
        if (!user) {
          res.status(404).json({ error: `User not found with email: ${email}` });
          return;
        }
        res.status(200).json(user);
      } 
      // Case 2: No email query parameter, return all users
      else {
        const users = await getAllUsers();
        res.status(200).json(users);
      }
    } catch (err) {
      handleErrorResponse(err, res);
    }
  };
  
  
  // --- The rest of your controller functions remain the same ---
  
  // Get user by ID
  export const getUserByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await getUserById(Number(id));
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      handleErrorResponse(err, res);
    }
  };
  
  
// Update user by ID
export const updateUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(Number(id), req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    // The magic happens here. The handler knows about Prisma's "not found" error.
    handleErrorResponse(err, res);
  }
};

// Delete a user by ID
export const deleteUserHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteUser(Number(id));
    res.status(204).send();
  } catch (err) {
    // And here as well. No more if/else logic in the controller.
    handleErrorResponse(err, res);
  }
};