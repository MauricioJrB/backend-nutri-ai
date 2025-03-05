import { NextFunction, Request, Response } from 'express';
import MealService from '../Services/MealService';
import UserService from '../Services/UserService';

export default class MealController {
  private res: Response;
  private req: Request;
  private next: NextFunction;
  private mealService: MealService;
  private userService: UserService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.res = res;
    this.req = req;
    this.next = next;
    this.mealService = new MealService();
    this.userService = new UserService();
  }

  public async create() {
    try {
      const userId = this.req.params.id;
      console.log(userId);
      const meals = await this.mealService.create(userId);
      console.log(meals);
      return this.res.status(201).json({ message: 'Meals created', meals });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error creating meal', error });
    }
  }

  public async getMealById() {
    try {
      const userId = this.req.params.id;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return this.res.status(404).json({ message: 'User not found' });
      }
      const meals = await this.mealService.getMealByUserId(userId);
      if (!meals) {
        return this.res.status(404).json({ message: 'Meal not found' });
      }
      return this.res.status(200).json({ meals });
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error getting meal by id', error });
    }
  }

  public async deleteMealByUserId() {
    try {
      const userId = this.req.params.id;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return this.res.status(404).json({ message: 'User not found' });
      }
      const meals = await this.mealService.getMealByUserId(userId);
      if (!meals) {
        return this.res.status(404).json({ message: 'Meal not found' });
      }
      await this.mealService.deleteMealById(userId); // Await the deletion
      return this.res
        .status(200)
        .json({ message: 'Meal deleted successfully' }); // Add response
    } catch (error) {
      return this.res
        .status(500)
        .json({ message: 'Error deleting meal', error });
    }
  }
}
