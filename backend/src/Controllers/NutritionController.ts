import { NextFunction, Request, Response } from 'express';
import NutritionService from '../Services/NutritionService';
import UserService from '../Services/UserMacroService';

export default class NutritionController {
  private res: Response;
  private req: Request;
  private next: NextFunction;
  private nutritionService: NutritionService;
  private userService: UserService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.nutritionService = new NutritionService();
    this.userService = new UserService();
  }

  public async create() {
    try {
      const userId = this.req.params.id;
      const nutrition = await this.nutritionService.create(userId);
      return this.res
        .status(201)
        .json({ message: 'Nutrition created', nutrition });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error creating nutrition calculate', error });
    }
  }

  public async getNutritionById() {
    try {
      const id = this.req.params.id;
      const user = await this.userService.getUserById(id);
      if (!user) {
        return this.res.status(404).json({ message: 'User not found' });
      }
      const nutrition = await this.nutritionService.getNutritionByUserId(id);
      if (!nutrition) {
        return this.res.status(404).json({ message: 'Nutrition not found' });
      }
      return this.res.status(200).json({ nutrition });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error to find nutrition calculate', error });
    }
  }

  public async deleteNutritionById() {
    try {
      const id = this.req.params.id;
      const nutrition = await this.nutritionService.getNutritionByUserId(id);
      if (!nutrition) {
        return this.res
          .status(400)
          .json({ message: 'Nutrition already deleted' });
      }
      await this.nutritionService.deleteNutritionById(id);
      return this.res.status(200).json({ message: 'Nutrition deleted' });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error to delete nutrition', error });
    }
  }
}
