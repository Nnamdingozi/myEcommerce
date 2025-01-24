'use strict';

const { 
    getAllUsers, 
    getUserById, 
    getUserByEmail, 
    updateUser, 
    deleteUser 
} = require('../services/userService');

// Get all users
const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
const getUserByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by email
const getUserByEmailHandler = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ error: 'User email required' });
        }

        const user = await getUserByEmail(email);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found with this email' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user by ID
const updateUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await updateUser(id, req.body);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a user by ID
const deleteUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const deleted = await deleteUser(id);

        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).json({ message: 'User successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllUsersHandler,
    getUserByIdHandler,
    getUserByEmailHandler,
    updateUserHandler,
    deleteUserHandler
};
