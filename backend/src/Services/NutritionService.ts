import NutritionODM from '../Models/NutritionCalculate';
import INutritionCalculations from '../Interfaces/INutritionCalculations';
import NutritionCalculate from '../Domains/NutritionCalculate';
import IUser from '../Interfaces/IUserMacro';
import UserService from './UserMacroService';
import mongoose from 'mongoose';

export default class NutritionService {
  private nutritionODM = new NutritionODM();
  private userService = new UserService();

  private calculateNutrition(user: IUser): INutritionCalculations {
    const { id, age, gender, height, weight, level, objective } = user;

    const heightInCm = height * 100;

    const BMR =
      gender === 'Masculino'
        ? 10 * weight + 6.25 * heightInCm - 5 * age + 5
        : 10 * weight + 6.25 * heightInCm - 5 * age - 161;

    let activityMultiplayer = 0;

    if (level === 'Sedentario') {
      activityMultiplayer = 1.2;
    }

    if (level === 'Levemente ativo') {
      activityMultiplayer = 1.375;
    }

    if (level === 'Moderadamente ativo') {
      activityMultiplayer = 1.55;
    }

    if (level === 'Muito ativo') {
      activityMultiplayer = 1.725;
    }

    const TDEE = BMR * activityMultiplayer;

    let totalCalories = TDEE;
    if (objective === 'Perder peso') {
      totalCalories -= 500;
    } else if (objective === 'Ganhar musculo') {
      totalCalories += 500;
    }

    const proteinCalories = 0.3 * totalCalories;
    const carbCalories = 0.4 * totalCalories;
    const fatCalories = 0.3 * totalCalories;

    const proteinGrams = proteinCalories / 4;
    const carbsGrams = carbCalories / 4;
    const fatsGrams = fatCalories / 9;

    const formattedBMR = parseFloat(BMR.toFixed(2));
    const formattedTDEE = parseFloat(TDEE.toFixed(2));
    const formattedCalories = parseFloat(totalCalories.toFixed(2));
    const formattedProtein = parseFloat(proteinGrams.toFixed(2));
    const formattedCarb = parseFloat(carbsGrams.toFixed(2));
    const formattedFat = parseFloat(fatsGrams.toFixed(2));

    return {
      userId: new mongoose.Types.ObjectId(id),
      BMR: formattedBMR,
      TDEE: formattedTDEE,
      totalCalories: formattedCalories,
      proteinGrams: formattedProtein,
      carbsGrams: formattedCarb,
      fatsGrams: formattedFat,
      createdAt: new Date(),
    };
  }

  private createNutrition(nutrition: INutritionCalculations) {
    return new NutritionCalculate(nutrition);
  }

  public async create(userId: string) {
    const user: IUser | null = await this.userService.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    const nutrition = this.calculateNutrition(user);
    await this.nutritionODM.create(nutrition);
    return this.createNutrition(nutrition);
  }

  public async getNutritionByUserId(id: string) {
    const nutrition = await this.nutritionODM.getNutritionByUserId(id);
    if (!nutrition) return null;
    return this.createNutrition(nutrition);
  }

  public async deleteNutritionById(id: string) {
    return this.nutritionODM.deleteNutritionById(id);
  }
}
