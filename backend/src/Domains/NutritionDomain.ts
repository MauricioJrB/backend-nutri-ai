import mongoose from 'mongoose';
import INutrition from '../Interfaces/INutrition';

export default class NutritionDomain {
  readonly userId: mongoose.Types.ObjectId;
  protected BMR: number;
  protected TDEE: number;
  protected totalCalories: number;
  protected proteinGrams: number;
  protected carbGrams: number;
  protected fatGrams: number;
  protected carbCalories: number;
  protected proteinCalories: number;
  protected fatCalories: number;
  protected createdAt: Date;

  constructor(nutrition: INutrition) {
    this.userId = nutrition.userId;
    this.BMR = nutrition.BMR || 0;
    this.TDEE = nutrition.TDEE || 0;
    this.totalCalories = nutrition.totalCalories || 0;
    this.proteinGrams = nutrition.proteinGrams || 0;
    this.carbGrams = nutrition.carbGrams || 0;
    this.fatGrams = nutrition.fatGrams || 0;
    this.carbCalories = nutrition.carbCalories || 0;
    this.proteinCalories = nutrition.proteinCalories || 0;
    this.fatCalories = nutrition.fatCalories || 0;
    this.createdAt = nutrition.createdAt;
  }
}
