import NutritionODM from '../Models/Nutrition';
import INutrition from '../Interfaces/INutrition';
import NutritionCalculate from '../Domains/NutritionDomain';
import IUser from '../Interfaces/IUserMacro';
import UserService from './UserMacroService';
import mongoose from 'mongoose';

export default class NutritionService {
  private nutritionODM = new NutritionODM();
  private userService = new UserService();

  private calculateNutrition(user: IUser): INutrition {
    const { id, age, gender, height, weight, level, objective } = user;

    const heightCM = height * 100;
    let physicalActivity = 0;
    let totalCalories = 0;

    const BMR =
      gender === 'Masculino'
        ? 88.362 + 13.397 * weight + 4.799 * heightCM - 5.677 * age
        : 447.593 + 9.247 * weight + 3.098 * heightCM - 4.33 * age;

    if (level === 'Sedentario') {
      physicalActivity = 1.2;
    } else if (level === 'Levemente ativo') {
      physicalActivity = 1.375;
    } else if (level === 'Moderadamente ativo') {
      physicalActivity = 1.55;
    } else {
      physicalActivity = 1.725;
    }

    const TDEE = BMR * physicalActivity;

    if (objective === 'Perder peso') {
      totalCalories = TDEE * 0.8;
    } else if (objective === 'Ganhar musculo') {
      totalCalories = TDEE * 1.15;
    } else {
      totalCalories = TDEE;
    }

    const proteinGrams = 2.2 * weight;
    const fatGrams = 0.9 * weight;

    const proteinKcal = proteinGrams * 4;
    const fatKcal = fatGrams * 9;
    const carbohydratesKcal = totalCalories - proteinKcal - fatKcal;

    const carbohydratesGrams = carbohydratesKcal / 4;

    return {
      userId: new mongoose.Types.ObjectId(id),
      BMR: parseFloat(BMR.toFixed(2)),
      TDEE: parseFloat(TDEE.toFixed(2)),
      totalCalories: parseFloat(totalCalories.toFixed(2)),
      carbGrams: parseFloat(carbohydratesGrams.toFixed(2)),
      proteinGrams: parseFloat(proteinGrams.toFixed(2)),
      fatGrams: parseFloat(fatGrams.toFixed(2)),
      carbCalories: parseFloat(carbohydratesKcal.toFixed(2)),
      proteinCalories: parseFloat(proteinKcal.toFixed(2)),
      fatCalories: parseFloat(fatKcal.toFixed(2)),
      createdAt: new Date(),
    };
  }

  private createNutrition(nutrition: INutrition) {
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
