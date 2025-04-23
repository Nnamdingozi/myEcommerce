"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.updateUserHandler = exports.getUserByEmailHandler = exports.getUserByIdHandler = exports.getAllUsersHandler = void 0;
const userService_1 = require("../services/userService");
// Get all users
const getAllUsersHandler = async (req, res) => {
    try {
        const users = await (0, userService_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllUsersHandler = getAllUsersHandler;
// Get user by ID
const getUserByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        const user = await (0, userService_1.getUserById)(Number(id));
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUserByIdHandler = getUserByIdHandler;
// Get user by email
const getUserByEmailHandler = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email || typeof email !== 'string') {
            res.status(400).json({ error: 'User email required' });
            return;
        }
        const user = await (0, userService_1.getUserByEmail)(email);
        if (!user) {
            res.status(404).json({ error: 'User not found with this email' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getUserByEmailHandler = getUserByEmailHandler;
// Update user by ID
const updateUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        const updatedUser = await (0, userService_1.updateUser)(Number(id), req.body);
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateUserHandler = updateUserHandler;
// Delete a user by ID
const deleteUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        const deleted = await (0, userService_1.deleteUser)(Number(id));
        if (!deleted) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(204).json({ message: 'User successfully deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteUserHandler = deleteUserHandler;
