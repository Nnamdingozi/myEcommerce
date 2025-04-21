
import { User } from '../database/models/user'; 
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    req.user = undefined;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      const userInstance = await User.findOne({ where: { id: (decoded as any).id } });

      if (userInstance) {
        req.user = userInstance; 
      } else {
        req.user = undefined;
      }
    } else {
      req.user = undefined;
    }

    next();
  } catch (err) {
    console.error('Token verification failed:', (err as Error).message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
