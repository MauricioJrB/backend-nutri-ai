import mongoose from 'mongoose';
import { IUser } from '../Interfaces/User';

export default class UserDomain implements IUser {
  public id: mongoose.Types.ObjectId;
  public name: string;
  public email: string;
  public password: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
}
