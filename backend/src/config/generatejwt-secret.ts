// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const generateToken = (user) => {
//     const payload = {
//         id: user.id,
//         email: user.email,
//     };

//     return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// module.exports = generateToken;


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUserPayload } from '../interface/IUser';

dotenv.config();



const generateToken = (user: IUserPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export default generateToken;
