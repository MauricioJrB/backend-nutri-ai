import mongoose from 'mongoose';

export default interface IMacronutrients {
  userId: mongoose.Types.ObjectId;
  BMR: number;
  TDEE: number;
  totalCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  proteinCalories: number;
  carbCalories: number;
  fatCalories: number;
  amountWater: number;
  createdAt: Date;
}
