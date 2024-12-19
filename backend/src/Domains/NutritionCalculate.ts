import mongoose from 'mongoose';
import INutritionCalculations from '../Interfaces/INutritionCalculations';

export default class NutritionCalculate {
  readonly userId: mongoose.Types.ObjectId;
  protected BMR: number;
  protected TDEE: number;
  protected totalCalories: number;
  protected proteinGrams: number;
  protected carbsGrams: number;
  protected fatsGrams: number;
  protected createdAt: Date;

  constructor(nutrition: INutritionCalculations) {
    this.userId = nutrition.userId;
    this.BMR = nutrition.BMR || 0;
    this.TDEE = nutrition.TDEE || 0;
    this.totalCalories = nutrition.totalCalories || 0;
    this.proteinGrams = nutrition.proteinGrams || 0;
    this.carbsGrams = nutrition.carbsGrams || 0;
    this.fatsGrams = nutrition.fatsGrams || 0;
    this.createdAt = nutrition.createdAt;
  }
}
