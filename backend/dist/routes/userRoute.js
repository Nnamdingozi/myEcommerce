"use strict";
// const express = require('express');
// const { getAllUsersHandler, getUserByIdHandler, getUserByEmailHandler, updateUserHandler, deleteUserHandler } = require('../controllers/userController');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const userRouter = express.Router();
// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     summary: Retrieve a list of all users
//  *     description: Retrieves an array of all users in the system.
//  *     responses:
//  *       200:
//  *         description: A list of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: string
//  *                     description: The user's ID
//  *                   username:
//  *                     type: string
//  *                     description: The user's username
//  *                   email:
//  *                     type: string
//  *                     description: The user's email address
//  *                   phone:
//  *                     type: string
//  *                     description: The user's phone number
//  *                   country_code:
//  *                     type: string
//  *                     description: The user's country code
//  *       400:
//  *         description: Bad request, e.g., invalid query parameters
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   description: Error message
//  *                   example: Invalid query parameter
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   description: Error message
//  */
// userRouter.get('/', getAllUsersHandler);
// userRouter.get('/email', getUserByEmailHandler);
// /**
//  * @swagger
//  * /users/{userId}:
//  *   get:
//  *     summary: Retrieve a user by ID
//  *     parameters:
//  *       - name: userId
//  *         in: path
//  *         required: true
//  *         description: The ID of the user to retrieve
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: User retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *                 email:
//  *                   type: string
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Internal server error
//  */
// userRouter.get('/:id', getUserByIdHandler);
// /**
//  * @swagger
//  * /users/{id}:
//  *   put:
//  *     summary: Update an existing user
//  *     description: Updates the details of an existing user by ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the user to update
//  *         schema:
//  *           type: string
//  *       - in: body
//  *         name: user
//  *         description: User data to update
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             username:
//  *               type: string
//  *             email:
//  *               type: string
//  *             phone:
//  *               type: string
//  *             password:
//  *               type: string
//  *             country_code:
//  *               type: string
//  *     responses:
//  *       200:
//  *         description: User updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 username:
//  *                   type: string
//  *                 email:
//  *                   type: string
//  *                 phone:
//  *                   type: string
//  *                 country_code:
//  *                   type: string
//  *       400:
//  *         description: Bad request or error occurred
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *       500:
//  *         description: Internal server error
//  */
// userRouter.put('/:id', updateUserHandler);
// /**
//  * @swagger
//  * /users/{id}:
//  *   delete:
//  *     summary: Delete a user by ID
//  *     description: Deletes an existing user from the database by their ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the user to delete
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: User deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: User deleted successfully
//  *       404:
//  *         description: User not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: User not found
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   example: Internal server error
//  */
// userRouter.delete('/:id', deleteUserHandler);
// module.exports = userRouter;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     description: Retrieves an array of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user's ID
 *                   username:
 *                     type: string
 *                     description: The user's username
 *                   email:
 *                     type: string
 *                     description: The user's email address
 *                   phone:
 *                     type: string
 *                     description: The user's phone number
 *                   country_code:
 *                     type: string
 *                     description: The user's country code
 *       400:
 *         description: Bad request, e.g., invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid query parameter
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
userRouter.get('/', userController_1.getAllUsersHandler);
userRouter.get('/email', userController_1.getUserByEmailHandler);
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/:id', userController_1.getUserByIdHandler);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     description: Updates the details of an existing user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         description: User data to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             password:
 *               type: string
 *             country_code:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 country_code:
 *                   type: string
 *       400:
 *         description: Bad request or error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
userRouter.put('/:id', userController_1.updateUserHandler);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes an existing user from the database by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.delete('/:id', userController_1.deleteUserHandler);
exports.default = userRouter;
// import express, { RequestHandler } from 'express';
// import {
//     getAllUsersHandler,
//     getUserByIdHandler,
//     getUserByEmailHandler,
//     updateUserHandler,
//     deleteUserHandler
// } from '../controllers/userController';
// const userRouter = express.Router();
// userRouter.get('/', getAllUsersHandler as RequestHandler);
// userRouter.get('/email', getUserByEmailHandler as RequestHandler);
// userRouter.delete('/:id', deleteUserHandler as RequestHandler);
// export default userRouter;
