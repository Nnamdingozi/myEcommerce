
import bcrypt from 'bcryptjs';
import User from '../database/models/user';
import { IUser, ICreateUser } from '../interface/IUser';
import { getUserByEmail } from './userService';


export interface IUserProfile {
  id: string;
  emails?: { value: string }[];
  username?: string;
  displayName?: string;
  [key: string]: any;
}

// Register a new user
export const register = async (input: ICreateUser): Promise<IUser> => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await User.create({
      username: input.username,
      email: input.email,
      phone: input.phone,
      password: hashedPassword,
      country_code: input.country_code,
    });
    return user.get({ plain: true }) as IUser;
  } catch (error) {
    console.error('Error during user registration:', error);
    throw new Error('User registration failed.');
  }
};

// Find user by email
export const findUserByEmail = async (email: string): Promise<User> => {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw new Error('Error finding user.');
  }
};

// Find user by ID
export const findUserById = async (userId: number): Promise<IUser | null> => {
  try {
    const user = await User.findByPk(userId);
    return user ? (user.get({ plain: true }) as IUser) : null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw new Error('Error finding user.');
  }
};

// Compare plain password with hashed password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Error comparing passwords.');
  }
};

// Find or create a user based on OAuth profile
export const findOrCreateUser = async (profile: IUserProfile, provider: string): Promise<User> => {
  try {
    const whereClause = { [`${provider}Id`]: profile.id };
    let user = await User.findOne({ where: whereClause });

    if (!user) {
      const email = profile.emails?.[0]?.value || `${profile.username || 'user'}-${profile.id}@placeholder.com`;
      const phoneNumber = '09000000000';

      user = await User.create({
        username: profile.displayName || profile.username || 'OAuthUser',
        email,
        phone: phoneNumber,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
        country_code: '+234',
        [`${provider}Id`]: profile.id,
      });
    }

    return user
  } catch (error) {
    console.error('Error finding or creating user:', error);
    throw new Error('Error finding or creating user.');
  }
};

// Get limited user details (safe to return)
export const getUserDetails = (user: IUser): { id: number; username: string; email: string } => {
  if (!user) {
    throw new Error('User not found');
  }
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

const authService = {
  register,
  findUserByEmail,
  comparePassword,
  findOrCreateUser,
  getUserDetails,
  findUserById,
};

export default authService;
