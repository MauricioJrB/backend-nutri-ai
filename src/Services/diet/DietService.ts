import { FoodItemProps } from '../../@types/FoodItem';
import { MealProps } from '../../@types/Meal';
import { DietResponseDto } from '../../dtos/DietDto';
import { Diet } from '../../entities/Diet';
import { IDietRepository } from '../../repositories/diet/IDietRepository';
import { IFoodItemRepository } from '../../repositories/foodItem/IFoodItemRepository';
import { IMacroRepository } from '../../repositories/macro/IMacroRepository';
import { IMealRepository } from '../../repositories/meal/IMealRepository';
import { IUserPreferenceRepository } from '../../repositories/userPreference/IUserPreferenceRepositoy';
import { IUserProfileRepository } from '../../repositories/userProfile/IUserProfileRepository';
import { GenerateDiet } from '../../utils/generateDiet/GenerateDiet';
import { IDietService } from './IDietService';

export class DietService implements IDietService {
  constructor(
    private readonly userProfileRepository: IUserProfileRepository,
    private readonly userPreferenceRepository: IUserPreferenceRepository,
    private readonly userMacroRepository: IMacroRepository,
    private readonly dietRepository: IDietRepository,
    private readonly mealRepository: IMealRepository,
    private readonly foodItemRepository: IFoodItemRepository,
  ) {}

  public static build(
    userProfileRepository: IUserProfileRepository,
    userPreferenceRepository: IUserPreferenceRepository,
    userMacroRepository: IMacroRepository,
    dietRepository: IDietRepository,
    mealRepository: IMealRepository,
    foodItemRepository: IFoodItemRepository,
  ): DietService {
    return new DietService(
      userProfileRepository,
      userPreferenceRepository,
      userMacroRepository,
      dietRepository,
      mealRepository,
      foodItemRepository,
    );
  }

  public async save(userId: string): Promise<DietResponseDto> {
    const userProfile = await this.userProfileRepository.findByUserId(userId);
    if (!userProfile) {
      throw new Error('User profile not found');
    }

    const userPreference =
      await this.userPreferenceRepository.findByUserId(userId);
    if (!userPreference) {
      throw new Error('User preference not found');
    }

    const userMacros = await this.userMacroRepository.findByUserId(userId);
    if (!userMacros) {
      throw new Error('User macros not found');
    }

    const diet = await this.dietRepository.findByUserId(userId);
    if (diet) {
      throw new Error('Diet already exists for this user');
    }

    const generateDiet = new GenerateDiet();

    const dietData = await generateDiet.buildDiet(
      userProfile,
      userPreference,
      userMacros,
    );

    const dietEntity = Diet.create({
      userId,
      expectedCalories: userMacros.totalKcal,
      expectedProtein: userMacros.proteinKcal,
      expectedCarb: userMacros.carbKcal,
      expectedFat: userMacros.fatKcal,
      meals: Array.isArray(dietData.meals)
        ? dietData.meals.map((meal: MealProps) => ({
            time: meal.time,
            name: meal.name,
            calories: meal.calories,
            foodItems: Array.isArray(meal.foods)
              ? meal.foods.map((food: FoodItemProps) => ({
                  item: food.item,
                  quantity: food.quantity,
                  protein: food.protein,
                  carb: food.carb,
                  fat: food.fat,
                }))
              : [],
          }))
        : [],
    });

    const savedDiet = await this.dietRepository.save(dietEntity);

    if (!savedDiet.id) {
      throw new Error('Saved diet does not have a valid id');
    }

    for (const meal of dietData.meals) {
      const savedMeal = await this.mealRepository.save({
        ...meal,
        dietId: savedDiet.id,
      });
      const foodItems = meal.foods ?? [];
      for (const foodItem of foodItems) {
        if (!savedMeal.id) {
          throw new Error('Saved meal does not have a valid id');
        }

        await this.foodItemRepository.save({
          ...foodItem,
          mealId: savedMeal.id,
        });
      }
    }

    const completeDiet = await this.dietRepository.find(savedDiet.id);

    if (!completeDiet) {
      throw new Error('Failed to retrieve saved diet');
    }

    return {
      id: completeDiet.id!,
      userId: completeDiet.userId,
      expectedCalories: completeDiet.expectedCalories,
      expectedProtein: completeDiet.expectedProtein,
      expectedCarb: completeDiet.expectedCarb,
      expectedFat: completeDiet.expectedFat,
      meals: completeDiet.meals.map((meal) => ({
        id: meal.id,
        dietId: meal.dietId,
        time: meal.time,
        name: meal.name,
        calories: meal.calories,
        foods:
          meal.foods?.map((food: FoodItemProps) => ({
            id: food.id,
            mealId: food.mealId,
            item: food.item,
            quantity: food.quantity,
            protein: food.protein,
            carb: food.carb,
            fat: food.fat,
          })) ?? [],
      })),
    };
  }

  public async findByUserId(userId: string): Promise<DietResponseDto | null> {
    const diet = await this.dietRepository.findByUserId(userId);
    if (!diet) throw new Error('Diet not found for this user');

    return {
      id: diet.id!,
      userId: diet.userId,
      expectedCalories: diet.expectedCalories,
      expectedProtein: diet.expectedProtein,
      expectedCarb: diet.expectedCarb,
      expectedFat: diet.expectedFat,
      meals: diet.meals.map((meal) => ({
        id: meal.id,
        dietId: meal.dietId,
        time: meal.time,
        name: meal.name,
        calories: meal.calories,
        foods:
          meal.foods?.map((food) => ({
            id: food.id,
            mealId: food.mealId,
            item: food.item,
            quantity: food.quantity,
            protein: food.protein,
            carb: food.carb,
            fat: food.fat,
          })) ?? [],
      })),
    };
  }

  public async delete(userId: string): Promise<void> {
    const diet = await this.dietRepository.findByUserId(userId);
    const mealExists = await this.mealRepository.findByUserId(userId);
    const foodItemExists = await this.foodItemRepository.findByUserId(userId);
    if (!mealExists && !foodItemExists) {
      throw new Error('No meals or food items found for this user');
    }
    if (!diet) {
      throw new Error('Diet not found for this user');
    }

    await this.foodItemRepository.deleteByUserId(userId);
    await this.mealRepository.deleteByUserId(userId);
    await this.dietRepository.deleteByUserId(userId);
  }
}
