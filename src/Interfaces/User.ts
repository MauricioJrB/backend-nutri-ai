import mongoose from 'mongoose';

export interface IUser {
  id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
}
