// import { IUserPayload } from '../../interface/IUser';

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUserPayload;
//     }

//     interface User extends IUserPayload {} // ✅ Move this inside the Express namespace
//   }
// }


import { IUser } from '../../interface/IUser';

declare global {
  namespace Express {
    interface User extends IUser {} // Make sure IUser includes `id`
    interface Request {
      user?: User;
    }
  }
}