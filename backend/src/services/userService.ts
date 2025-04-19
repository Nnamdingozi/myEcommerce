
// const  { User }   = require('../database/models');


// const getAllUsers = async () => {
//     const users = await User.findAll();
//     if (users) {
//         return users;
//     }
//     throw new Error('Invalid operation')

// };

// // get a user by id

// const getUserById = async (id) => {
//     if(!id) {
//         throw new Error('Invalid ID provided')
//     }

//     const user = await User.findByPk(id);
//     if (user) {
//         return user;
//     }
//     throw new Error(`user with Id ${id} not found`)
// };
// // get user by email
// const getUserByEmail = async (email) => {
//     const user = await User.findOne({where:{ email} });
//     if (user) {
   
//         return user;
//     }
//     throw new Error('Unable to get user by email')
// }

// //update a user

// const updateUser = async (userId, userData) => {
//     const [updated] = await User.update(userData, {
//         where: {id: userId}
//     });
//     if(updated) {
//         return await User.findByPk(userId)
//     }
//     throw new Error('user not found')
// };
// //delete a user
// const deleteUser = async (userId) => {
//     const deleted = await User.destroy({
//         where: {id: userId}
//     });
//     if(deleted) {
//         return true;
//     }
//     throw new Error('User not found');
// };
// module.exports = {
//     getAllUsers,
//     getUserById,
//     getUserByEmail,
//     updateUser,
//     deleteUser
// }









import  User from '../database/models/user';
import {IUser} from '../interface/IUser'



// Get all users
export const getAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await User.findAll();
  if (users) {
    return users;
  }
  throw new Error('Invalid operation');
};

// Get a user by id
export const getUserById = async (id: number): Promise<User> => {
  if (!id) {
    throw new Error('Invalid ID provided');
  }
  const user: User | null = await User.findByPk(id);
  if (user) {
    return user;
  }
  throw new Error(`User with ID ${id} not found`);
};

// Get a user by email
export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return user;
  }
  throw new Error('Unable to get user by email');
};

export const updateUser = async (
  userId: number,
  userData: Partial<IUser>
): Promise<IUser> => {
  const [updated] = await User.update(userData, {
    where: { id: userId },
  });

  if (updated) {
    const updatedUser: IUser | null = await User.findByPk(userId);
    if (updatedUser) {
      return updatedUser;
    }
  }

  throw new Error('User not found');
};

// Delete a user
export const deleteUser = async (userId: number): Promise<boolean> => {
  const deleted: number = await User.destroy({
    where: { id: userId },
  });
  if (deleted) {
    return true;
  }
  throw new Error('User not found');
};
