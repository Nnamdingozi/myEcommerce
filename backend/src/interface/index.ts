
import type { User as MyUser } from '../database/models/user';

declare global {
  namespace Express {
    interface User extends MyUser {}
  }
}
export {};
