import { Response } from 'express';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { DietRepository } from '../../../../repositories/diet/DietRepository';
import { FoodItemRepository } from '../../../../repositories/foodItem/FoodItemRepository';
import { MacroRepository } from '../../../../repositories/macro/MacroRepository';
import { MealRepository } from '../../../../repositories/meal/MealRepository';
import { UserPreferenceRepository } from '../../../../repositories/userPreference/UserPreferenceRepository';
import { UserProfileRepository } from '../../../../repositories/userProfile/UserProfileRepository';
import { DietService } from '../../../../services/diet/DietService';
import { IDietService } from '../../../../services/diet/IDietService';
import { prisma } from '../../../../utils/prisma';

export class DietController {
  constructor(private readonly service: IDietService) {}

  public static build() {
    const dietRepository = DietRepository.build(prisma);
    const userProfileRepository = UserProfileRepository.build(prisma);
    const userPreferenceRepository = UserPreferenceRepository.build(prisma);
    const userMacroRepository = MacroRepository.build(prisma);
    const mealRepository = MealRepository.build(prisma);
    const foodItemRepository = FoodItemRepository.build(prisma);
    const service = DietService.build(
      userProfileRepository,
      userPreferenceRepository,
      userMacroRepository,
      dietRepository,
      mealRepository,
      foodItemRepository,
    );
    return new DietController(service);
  }

  public async save(req: CustomRequest, res: Response) {
    try {
      if (!req.user)
        return res
          .status(401)
          .json({ message: 'Unauthorized. No user found in request.' });
      const userId = req.user.id;
      const diet = await this.service.save(userId);

      return res.status(201).json(diet);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  public async findByUserId(req: CustomRequest, res: Response) {
    try {
      if (!req.user)
        return res
          .status(401)
          .json({ message: 'Unauthorized. No user found in request.' });
      const userId = req.user.id;
      const diet = await this.service.findByUserId(userId);

      return res.status(200).json(diet);
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
      console.log('Error:', error);
    }
  }

  public async delete(req: CustomRequest, res: Response) {
    try {
      if (!req.user)
        return res
          .status(401)
          .json({ message: 'Unauthorized. No user found in request.' });
      const userId = req.user.id;
      await this.service.deleteByUserId(userId);
      return res.status(200).send({ message: 'Diet deleted successfully.' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
