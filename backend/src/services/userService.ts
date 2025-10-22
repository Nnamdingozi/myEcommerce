// src/services/userService.ts

import prisma from '../lib/prisma'; // Import our single, shared Prisma client instance
import { User, Prisma } from '@prisma/client'; 


// Get all users
export const getAllUsers = async (): Promise<User[]> => {

  const users = await prisma.user.findMany();
  return users;
};

// Get a user by ID
export const getUserById = async (id: number): Promise<User | null> => {

  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

// Get a user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {

  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

// Update a user
export const updateUser = async (
  userId: number,
  userData: Prisma.UserUpdateInput // Use Prisma's specific input type for type-safety
): Promise<User> => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: userData,
  });
  return updatedUser;
};

// Delete a user
export const deleteUser = async (userId: number): Promise<User> => {

  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });
  return deletedUser;
};