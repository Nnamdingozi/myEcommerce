

// // src/types/express/index.d.ts

// // First, import the original types from Prisma
// import { User as PrismaUser } from '@prisma/client';
// import { JwtPayload } from '../../controllers/authController'; // Adjust path if needed

// // Use declaration merging to add our custom properties to Express's Request object
// declare global {
//   namespace Express {
//     // This merges with the existing `Express.User` interface
//     export interface User extends PrismaUser {}

//     // This extends the `Request` interface to include the `user` property
//     // with our custom User type.
//     export interface Request {
//       user?: User | JwtPayload;
//     }
//   }
// }

// export {};



// src/types/express/index.d.ts

import { User as PrismaUser } from '@prisma/client';
// We no longer need to import JwtPayload here, but it's good practice
// to ensure it's defined correctly in its own file.

// Let's assume JwtPayload is defined in your authController like this:
// export interface JwtPayload { id: number; email: string; }
// For this file, we'll just define the shape we need.
interface JwtPayload {
  id: number;
  email: string;
}

// Use declaration merging to modify the global Express namespace.
declare global {
  namespace Express {
    /**
     * This is the key fix. We are merging our types into the `User` interface.
     * We are telling TypeScript that throughout our application, `Express.User`
     * can be either the full user object from Prisma OR the minimal JWT payload.
     */
    export interface User extends PrismaUser, Partial<JwtPayload> {}
  }
}

// We no longer need to re-declare the `Request` interface at all.
// The original `Request` interface has `user?: Express.User`, and since we've
// expanded what `Express.User` can be, the `Request` interface is
// automatically updated to match.

// You must export something to make this file a module.
export {};