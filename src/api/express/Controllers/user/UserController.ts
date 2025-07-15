import { prisma } from '../../../../utils/prisma';
import { Response } from 'express';
import { UserService } from '../../../../services/user/UserService';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { UserRepository } from '../../../../repositories/user/UserRepository';
import { UserProfileRepository } from '../../../../repositories/userProfile/UserProfileRepository';
import { UserPreferenceRepository } from '../../../../repositories/userPreference/UserPreferenceRepository';
import { MacroRepository } from '../../../../repositories/macro/MacroRepository';
import { DietRepository } from '../../../../repositories/diet/DietRepository';
import { FoodItemRepository } from '../../../../repositories/foodItem/FoodItemRepository';
import { MealRepository } from '../../../../repositories/meal/MealRepository';

export default class UserController {
  constructor(private readonly service: UserService) {}

  public static build() {
    const repository = UserRepository.build(prisma);
    const userProfileRepository = UserProfileRepository.build(prisma);
    const userPreferenceRepository = UserPreferenceRepository.build(prisma);
    const userMacroRepository = MacroRepository.build(prisma);
    const dietRepository = DietRepository.build(prisma);
    const mealRepository = MealRepository.build(prisma);
    const foodItemRepository = FoodItemRepository.build(prisma);
    const service = UserService.build(
      repository,
      userProfileRepository,
      userPreferenceRepository,
      userMacroRepository,
      dietRepository,
      mealRepository,
      foodItemRepository,
    );
    return new UserController(service);
  }

  public async find(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const id = req.user.id;

      const data = await this.service.find(id);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }

  public async updatePassword(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const id = req.user.id;
      const { oldPassword, newPassword } = req.body;

      await this.service.update(id, oldPassword, newPassword);

      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const id = req.user.id;

      await this.service.delete(id);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }

  public async deleteAccount(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const id = req.user.id;

      await this.service.deleteAccount(id);
      return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }
}
