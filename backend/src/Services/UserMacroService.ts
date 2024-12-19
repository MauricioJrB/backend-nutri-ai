import UserMacroODM from '../Models/UserMacro';
import IUserMacro from '../Interfaces/IUserMacro';
import UserMacroDomain from '../Domains/UserMacroDomain';

export default class UserMacroService {
  private userODM = new UserMacroODM();

  // Essa função ira criar um dominio para as caracteristicas de retornam do body.
  private createUser(user: IUserMacro) {
    return new UserMacroDomain(user);
  }

  public async create(user: IUserMacro) {
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

  public async updateUserById(id: string, user: IUserMacro) {
    const existingUser = await this.userODM.getUserById(id);
    if (!existingUser) return false;
    const updatedUser = await this.userODM.updateUserById(id, user);
    return updatedUser;
  }

  public async deleteUserById(id: string) {
    return this.userODM.deleteUserById(id);
  }
}
