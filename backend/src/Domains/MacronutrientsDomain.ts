import mongoose from 'mongoose';
import IMacronutrients from '../Interfaces/IMacronutrients';

export default class MacronutrientsDomain {
  public userId: mongoose.Types.ObjectId;
  public BMR: number;
  public TDEE: number;
  public totalCalories: number;
  public proteinGrams: number;
  public carbGrams: number;
  public fatGrams: number;
  public carbCalories: number;
  public proteinCalories: number;
  public fatCalories: number;
  public amountWater: number;
  public createdAt: Date;

  constructor(macro: IMacronutrients) {
    this.userId = macro.userId;
    this.BMR = macro.BMR || 0;
    this.TDEE = macro.TDEE || 0;
    this.totalCalories = macro.totalCalories || 0;
    this.proteinGrams = macro.proteinGrams || 0;
    this.carbGrams = macro.carbGrams || 0;
    this.fatGrams = macro.fatGrams || 0;
    this.carbCalories = macro.carbCalories || 0;
    this.proteinCalories = macro.proteinCalories || 0;
    this.fatCalories = macro.fatCalories || 0;
    this.amountWater = macro.amountWater || 0;
    this.createdAt = macro.createdAt;
  }
}
