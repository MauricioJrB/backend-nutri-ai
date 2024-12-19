import mongoose from 'mongoose';

export default interface INutritionCalculations {
  userId: mongoose.Types.ObjectId;
  BMR: number;
  TDEE: number;
  totalCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  createdAt: Date;
}
