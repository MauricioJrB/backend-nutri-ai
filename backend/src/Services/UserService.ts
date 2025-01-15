import UserODM from '../Models/User';
import IUser from '../Interfaces/IUser';
import UserDomain from '../Domains/UserDomain';

export default class UserService {
  private userODM = new UserODM();

  private createUser(user: IUser) {
    return new UserDomain(user);
  }

  public async create(user: IUser) {
    const existingUser = await this.userODM.getUserByUsername(user.username);
    if (existingUser) return false;
    const newUser = await this.userODM.create(user);
    return this.createUser(newUser);
  }

  public async getAllUsers() {
    const users = await this.userODM.getAllUsers();
    return users.map((user) => this.createUser(user));
  }

  public async getUserById(id: string) {
    const user = await this.userODM.getUserById(id);
    if (!user) return null;
    return this.createUser(user);
  }

  public async updateUserById(id: string, user: IUser) {
    const existingUser = await this.userODM.getUserById(id);
    if (!existingUser) return false;
    const updatedUser = await this.userODM.updateUserById(id, user);
    return updatedUser;
  }

  public async deleteUserById(id: string) {
    return this.userODM.deleteUserById(id);
  }
}
