
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { User } from '@prisma/client'; 


// This interface is for external profiles (e.g., from GitHub)
export interface IOAuthProfile {
  id: string;
  emails?: { value: string }[];
  username?: string;
  displayName?: string;
}

// Register a new user

type RegisterPayload = Pick<User, 'username' | 'email' | 'phone' | 'password' | 'countryCode'>;

export const register = async (input: RegisterPayload): Promise<User> => {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  //  create a  the user 
  const user = await prisma.user.create({
    data: {
      username: input.username,
      email: input.email,
      phone: input.phone,
      password: hashedPassword,
      countryCode: input.countryCode,
    },
  });

  return user;
};

// Compare plain password with hashed password 
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Find or create a user based on OAuth profile using Prisma's `upsert`
export const findOrCreateUser = async (profile: IOAuthProfile): Promise<User> => {

  const user = await prisma.user.upsert({
    where: {
      githubId: profile.id, 
    },
    update: {},
    create: { 
      githubId: profile.id,
      email: profile.emails?.[0]?.value || `${profile.id}@github.placeholder.com`,
      username: profile.displayName || profile.username || `user${profile.id}`,
      phone: '0000000000', 
      countryCode: 'NG',  

      // Create a random password since OAuth users don't have one
      password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
    },
  });
  return user;
};
//Get use details
export const getUserDetails = (user: User): { id: number; username: string; email: string; phone: string; countryCode: string; } => {
  
  // Exclude password from the returned value
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    countryCode: user.countryCode,
  };
};

const authService = {
  register,
  comparePassword,
  findOrCreateUser,
  getUserDetails,
};

export default authService;