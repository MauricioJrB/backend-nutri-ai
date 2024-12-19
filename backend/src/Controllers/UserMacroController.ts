import { NextFunction, Request, Response } from 'express';
import IUser from '../Interfaces/IUserMacro';
import UserMacroService from '../Services/UserMacroService';

export default class UserMacroController {
  private res: Response;
  private req: Request;
  private next: NextFunction;
  private userMacroService: UserMacroService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.userMacroService = new UserMacroService();
  }

  public async create() {
    try {
      const user: IUser = { ...this.req.body };
      const newUser = await this.userMacroService.create(user);
      if (!newUser)
        return this.res
          .status(400)
          .json({ message: 'User already exists: ', newUser });
      return this.res.status(201).json({ message: 'User created: ', newUser });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error creating user', error });
    }
  }

  public async getAllUsers() {
    try {
      const users = await this.userMacroService.getAllUsers();
      return this.res.status(200).json({ users: users });
    } catch (error) {
      return this.res
        .status(404)
        .json({ message: 'Error to find users', error });
    }
  }

  public async getUserById() {
    try {
      const id = this.req.params.id;
      const user = await this.userMacroService.getUserById(id);
      if (!user)
        return this.res.status(404).json({ message: 'User not found' });
      return this.res.status(200).json(user);
    } catch (error) {
      return this.res
        .status(404)
        .json({ message: 'Error to find user', error });
    }
  }

  public async updateUserById() {
    try {
      const id = this.req.params.id;
      const user: IUser = { ...this.req.body };
      const updatedUser = await this.userMacroService.updateUserById(id, user);
      return this.res
        .status(200)
        .json({ message: 'User updated: ', updatedUser });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error to update user', error });
    }
  }

  public async deleteUserById() {
    try {
      const id = this.req.params.id;
      const user = await this.userMacroService.getUserById(id);
      if (!user) {
        return this.res.status(400).json({ message: 'User already deleted' });
      }
      await this.userMacroService.deleteUserById(id);
      return this.res
        .status(200)
        .json({ message: 'User deleted', userDeleted: user });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error to delete user', error });
    }
  }
}
