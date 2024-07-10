'use strict'

const { getAllUsers, getUserById, updateUser, deleteUser, } = require('../services/userService');

//get all users
const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserByIdHandler = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}         

const updateUserHandler = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        if (updateUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(400).json({ error: err.message });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });

    }
};

//delete a user
const deleteUserHandler = async (req, res) => {
    try {
        const deleted = await deleteUser(req.params.id);
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllUsersHandler,
    getUserByIdHandler,
    updateUserHandler,
    deleteUserHandler

}