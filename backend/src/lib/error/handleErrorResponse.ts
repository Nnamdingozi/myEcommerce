// lib/error/handleErrorResponse.ts

import { Response } from 'express';
import { Prisma } from '@prisma/client'; // Import Prisma to recognize its error types


export const handleErrorResponse = (err: unknown, res: Response): void => {
  // 1. Handle Prisma's "Record Not Found" Error
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    const message = (err.meta?.cause as string) || 'The requested resource was not found.';
    res.status(404).json({ error: message });
    return;
  }

  // 2. Handle Prisma's "Unique Constraint Violation" Error
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    const fields = (err.meta?.target as string[])?.join(', ');
    res.status(409).json({ error: `A record with this ${fields} already exists.` }); // 409 Conflict
    return;
  }
  
  // 3. Handle Prisma's general validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ error: 'Invalid input data provided.' });
    return;
  }


  if (err instanceof SyntaxError) {
    res.status(400).json({ error: 'Invalid JSON format' });
    return;
  }

  if (err instanceof Error && (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }
  
  // Generic fallback for any other errors
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
};