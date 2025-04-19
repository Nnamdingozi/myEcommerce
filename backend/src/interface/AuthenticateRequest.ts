// import { Request } from 'express';
// import { IUser } from './IUser';

// export interface AuthenticatedRequest extends Omit<Request, 'user' | 'logIn'> {
//   user?: IUser;
//   // Override logIn to accept IUser
//   logIn(user: IUser, options: { session: boolean }, callback: (err: any) => void): void;
//   logOut: Request['logOut'];
//   isAuthenticated: Request['isAuthenticated'];
//   isUnauthenticated: Request['isUnauthenticated'];
// }



import { Request } from 'express';
import { IUserPayload, IUser} from './IUser';

export interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: IUser;
  
}
