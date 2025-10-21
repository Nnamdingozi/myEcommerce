
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtPayload } from '../controllers/authController';
dotenv.config();



const generateToken = (user: JwtPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export default generateToken;
