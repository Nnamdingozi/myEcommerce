

import express from 'express';
import {
    getAllUsersHandler,
    getUserByIdHandler,
    getUserByEmailHandler,
    updateUserHandler,
    deleteUserHandler
} from '../controllers/userController';

const userRouter = express.Router();

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

userRouter.get('/', getAllUsersHandler);
userRouter.get('/email', getUserByEmailHandler);

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

userRouter.get('/:id', getUserByIdHandler);

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

userRouter.put('/:id', updateUserHandler);

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

userRouter.delete('/:id', deleteUserHandler);

export default userRouter;

