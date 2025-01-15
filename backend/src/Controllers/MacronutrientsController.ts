import { NextFunction, Request, Response } from 'express';
import MacronutrientsService from '../Services/MacronutrientsService';
import UserService from '../Services/UserService';

export default class MacronutrientsController {
  private res: Response;
  private req: Request;
  private next: NextFunction;
  private macronutrientsService: MacronutrientsService;
  private userService: UserService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.macronutrientsService = new MacronutrientsService();
    this.userService = new UserService();
  }

  public async create() {
    try {
      const userId = this.req.params.id;
      const macronutrients = await this.macronutrientsService.create(userId);
      return this.res
        .status(201)
        .json({ message: 'Macronutrients created', macronutrients });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error creating Macronutrients calculate', error });
    }
  }

  public async getMacronutrientsById() {
    try {
      const id = this.req.params.id;
      const user = await this.userService.getUserById(id);
      if (!user) {
        return this.res.status(404).json({ message: 'User not found' });
      }
      const macronutrients =
        await this.macronutrientsService.getMacronutrientsByUserId(id);
      if (!macronutrients) {
        return this.res
          .status(404)
          .json({ message: 'Macronutrients not found' });
      }
      return this.res.status(200).json({ macronutrients });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error to find Macronutrients calculate', error });
    }
  }

  public async deleteMacronutrientsById() {
    try {
      const id = this.req.params.id;
      const macronutrients =
        await this.macronutrientsService.getMacronutrientsByUserId(id);
      if (!macronutrients) {
        return this.res
          .status(400)
          .json({ message: 'Macronutrients already deleted' });
      }
      await this.macronutrientsService.deleteMacronutrientsById(id);
      return this.res.status(200).json({ message: 'Macronutrients deleted' });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error to delete macronutrients', error });
    }
  }
}
