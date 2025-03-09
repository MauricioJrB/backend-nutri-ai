import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import { IUser } from '../Interfaces/User';

export default class UserController {
  private res: Response;
  private req: Request;
  private userService: UserService;

  constructor(req: Request, res: Response) {
    this.res = res;
    this.req = req;
    this.userService = new UserService();
  }

  public async signUp() {
    try {
      const user: IUser = { ...this.req.body };
      const newUser = await this.userService.create(user);

      return this.res
        .status(201)
        .json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      return this.res
        .status(400)
        .json({ message: 'Error creating user', error: error });
    }
  }

  public async login() {
    try {
      const user: IUser = { ...this.req.body };

      // devo encriptar senha

      const userExists = await this.userService.getUserByEmail(user.email);

      if (!userExists)
        return this.res.status(404).json({ message: 'User not found' });

      return this.res
        .status(200)
        .json({ message: 'User logged in successfully', user: user });
    } catch (error) {
      return this.res
        .status(400)
        .json({ message: 'Error logging in user', error: error });
    }
  }

  public async getUser() {
    try {
      const user = await this.userService.getUserById(this.req.params.id);
      if (!user)
        return this.res.status(404).json({ message: 'User not found' });

      return this.res.status(200).json({ user });
    } catch (error) {
      return this.res.status(404).json({ message: 'User not found' });
    }
  }

  public async updatePassword() {
    try {
      const { id } = this.req.params;
      const { password } = this.req.body;
      const user = await this.userService.getUserById(id);
      if (!user)
        return this.res.status(404).json({ message: 'User not found' });
      await this.userService.updatePassword(id, password);
      return this.res
        .status(200)
        .json({ message: 'Password updated successfully' });
    } catch (error) {
      return this.res.status(404).json({ message: 'User not found' });
    }
  }

  public async deleteUser() {
    try {
      const { id } = this.req.params;
      const user = await this.userService.getUserById(id);
      if (!user)
        return this.res.status(404).json({ message: 'User not found' });
      await this.userService.deleteUserById(id);
      return this.res
        .status(200)
        .json({ message: 'User deleted successfully' });
    } catch (error) {
      return this.res.status(404).json({ message: 'User not found' });
    }
  }
}
