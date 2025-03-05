import { Schema, Model, model, models } from 'mongoose';
import IUser from '../Interfaces/IUser';

export default class UserODM {
  private static model: Model<IUser>;

  constructor() {
    if (!UserODM.model) {
      const schema = new Schema<IUser>({
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        level: { type: String, required: true },
        objective: { type: String, required: true },
        trainingFrequency: { type: Number, required: true },
      });
      UserODM.model = models.Users || model<IUser>('User', schema);
    }
  }

  public async create(user: IUser) {
    return UserODM.model.create({ ...user });
  }

  public async getAllUsers() {
    const users = await UserODM.model.find();
    return users;
  }

  public async getUserById(id: string) {
    const user = await UserODM.model.findOne({ _id: id });
    return user;
  }

  public async getUserByUsername(username: string) {
    const user = await UserODM.model.findOne({ username });
    return user;
  }

  public updateUserById(id: string, user: IUser) {
    return UserODM.model.findByIdAndUpdate({ _id: id }, user, {
      new: true,
    });
  }

  public async deleteUserById(id: string) {
    return UserODM.model.deleteOne({ _id: id });
  }
}
