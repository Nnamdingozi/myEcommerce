// 'use strict';

// const { 
//     getAllUsers, 
//     getUserById, 
//     getUserByEmail, 
//     updateUser, 
//     deleteUser 
// } = require('../services/userService');

// // Get all users
// const getAllUsersHandler = async (req, res) => {
//     try {
//         const users = await getAllUsers();
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get user by ID
// const getUserByIdHandler = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!id) {
//             return res.status(400).json({ error: 'User ID is required' });
//         }

//         const user = await getUserById(id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get user by email
// const getUserByEmailHandler = async (req, res) => {
//     try {
//         const { email } = req.query;

//         if (!email) {
//             return res.status(400).json({ error: 'User email required' });
//         }

//         const user = await getUserByEmail(email);
        
//         if (!user) {
//             return res.status(404).json({ error: 'User not found with this email' });
//         }

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Update user by ID
// const updateUserHandler = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedUser = await updateUser(id, req.body);

//         if (!updatedUser) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.status(200).json(updatedUser);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Delete a user by ID
// const deleteUserHandler = async (req, res) => {
//     try {
//         const { id } = req.params;
        
//         if (!id) {
//             return res.status(400).json({ error: 'User ID is required' });
//         }

//         const deleted = await deleteUser(id);

//         if (!deleted) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(204).json({ message: 'User successfully deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = {
//     getAllUsersHandler,
//     getUserByIdHandler,
//     getUserByEmailHandler,
//     updateUserHandler,
//     deleteUserHandler
// };


import { Request, Response } from 'express';
import { IUser } from '../interface/IUser';
import { 
    getAllUsers, 
    getUserById, 
    getUserByEmail, 
    updateUser, 
    deleteUser 
} from '../services/userService';

// Get all users
export const getAllUsersHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Get user by ID
export const getUserByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        
        const user: IUser | null = await getUserById(Number(id));
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Get user by email
export const getUserByEmailHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.query;
        if (!email || typeof email !== 'string') {
            res.status(400).json({ error: 'User email required' });
            return;
        }
        
        const user: IUser | null = await getUserByEmail(email);
        if (!user) {
            res.status(404).json({ error: 'User not found with this email' });
            return;
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Update user by ID
export const updateUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }

        const updatedUser: IUser | null = await updateUser(Number(id), req.body);
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

// Delete a user by ID
export const deleteUserHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        
        const deleted: boolean = await deleteUser(Number(id));
        if (!deleted) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        
        res.status(204).json({ message: 'User successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};
