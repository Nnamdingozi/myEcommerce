
import { IUser } from '../../interface/IUser';

declare global {
  namespace Express {
    interface User extends IUser {} // Make sure IUser includes `id`
    interface Request {
      user?: User;
    }
  }
}