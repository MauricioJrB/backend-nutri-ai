import { Request } from 'express';
import { AppUser } from '../../@types/Auth';

export interface CustomRequest extends Request {
  user?: AppUser;
  token?: string;
}
