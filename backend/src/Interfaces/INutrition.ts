import mongoose from 'mongoose';

export default interface INutrition {
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
  createdAt: Date;
}
