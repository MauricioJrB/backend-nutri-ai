import mongoose from 'mongoose';
import IMacronutrients from '../Interfaces/IMacronutrients';

export default class MacronutrientsDomain {
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
  protected amountWater: number;
  protected createdAt: Date;

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
