import { model, Model, models, Schema } from 'mongoose';
import { IUser } from '../Interfaces/User';

export default class UserODM {
  private static model: Model<IUser>;

  constructor() {
    if (!UserODM.model) {
      const schema = new Schema<IUser>({
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
      });
      UserODM.model = models.User || model<IUser>('User', schema);
    }
  }

  public async create(user: IUser): Promise<IUser> {
    return UserODM.model.create(user);
  }

  public async getUserById(id: string) {
    const user = await UserODM.model.findOne({ _id: id });
    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await UserODM.model.findOne({ email: email });
    return user;
  }

  public async updatePassword(id: string, password: string) {
    const updatePassword = await UserODM.model.findOneAndUpdate(
      { _id: id },
      { $set: { password } },
      { new: true },
    );
    return updatePassword;
  }

  public async deleteUserById(id: string) {
    const user = await UserODM.model.findOneAndDelete({ _id: id });
    return user;
  }
}
