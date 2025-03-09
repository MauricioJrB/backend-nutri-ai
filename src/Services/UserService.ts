import UserDomain from '../Domains/UserDomain';
import { IUser } from '../Interfaces/User';
import UserODM from '../Models/User';

export default class UserService {
  private userODM = new UserODM();

  private createUser(user: IUser) {
    return new UserDomain(user);
  }

  public async create(user: IUser) {
    const newUser = await this.userODM.create(user);
    return this.createUser(newUser);
  }

  public async getUserByEmail(email: string) {
    const user = await this.userODM.getUserByEmail(email);
    if (!user) return null;
    return this.createUser(user);
  }

  public async getUserById(id: string) {
    const user = await this.userODM.getUserById(id);
    if (!user) return null;
    return this.createUser(user);
  }

  public async updatePassword(id: string, password: string) {
    const newPassword = await this.userODM.updatePassword(id, password);

    return newPassword;
  }

  public async deleteUserById(id: string) {
    return this.userODM.deleteUserById(id);
  }
}
