import { Schema, Model, model, models } from 'mongoose';
import IUserMacro from '../Interfaces/IUserMacro';

export default class UserMacroODM {
  private static model: Model<IUserMacro>;

  constructor() {
    if (!UserMacroODM.model) {
      const schema = new Schema<IUserMacro>({
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        level: { type: String, required: true },
        objective: { type: String, required: true },
        trainingFrequency: { type: Number, required: true },
      });
      UserMacroODM.model =
        models.Users || model<IUserMacro>('User_Macro', schema);
    }
  }

  public async create(user: IUserMacro) {
    return UserMacroODM.model.create({ ...user });
  }

  public async getAllUsers() {
    const users = await UserMacroODM.model.find();
    return users;
  }

  public async getUserById(id: string) {
    const user = await UserMacroODM.model.findOne({ _id: id });
    return user;
  }

  public async getUserByUsername(username: string) {
    const user = await UserMacroODM.model.findOne({ username });
    return user;
  }

  public updateUserById(id: string, user: IUserMacro) {
    return UserMacroODM.model.findByIdAndUpdate({ _id: id }, user, {
      new: true,
    });
  }

  public async deleteUserById(id: string) {
    return UserMacroODM.model.deleteOne({ _id: id });
  }
}
