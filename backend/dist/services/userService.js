"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../database/models/user"));
// Get all users
const getAllUsers = async () => {
    const users = await user_1.default.findAll();
    if (users) {
        return users;
    }
    throw new Error('Invalid operation');
};
exports.getAllUsers = getAllUsers;
// Get a user by ID
const getUserById = async (id) => {
    if (!id) {
        throw new Error('Invalid ID provided');
    }
    const user = await user_1.default.findByPk(id);
    if (user) {
        return user;
    }
    throw new Error(`User with ID ${id} not found`);
};
exports.getUserById = getUserById;
// Get a user by email
const getUserByEmail = async (email) => {
    const user = await user_1.default.findOne({ where: { email } });
    if (user) {
        return user;
    }
    throw new Error('Unable to get user by email');
};
exports.getUserByEmail = getUserByEmail;
// Update a user
const updateUser = async (userId, userData) => {
    const [updated] = await user_1.default.update(userData, {
        where: { id: userId },
    });
    if (updated) {
        const updatedUser = await user_1.default.findByPk(userId);
        if (updatedUser) {
            return updatedUser;
        }
    }
    throw new Error('User not found');
};
exports.updateUser = updateUser;
// Delete a user
const deleteUser = async (userId) => {
    const deleted = await user_1.default.destroy({
        where: { id: userId },
    });
    if (deleted) {
        return true;
    }
    throw new Error('User not found');
};
exports.deleteUser = deleteUser;
