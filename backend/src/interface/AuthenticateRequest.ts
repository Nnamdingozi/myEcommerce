
import { Request } from 'express';
import { IUser} from './IUser';

export interface AuthenticatedRequest extends Omit<Request, 'user'> {
  user?: IUser;
  
}
