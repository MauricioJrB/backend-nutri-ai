import mongoose from 'mongoose';

export default interface IMeal {
  userId: mongoose.Types.ObjectId;
  meals: Array<{
    time: string;
    name: string;
    calories: number;
    food: Array<{
      item: string;
      quantity: number;
      protein: number;
      carbs: number;
      fat: number;
    }>;
  }>;
}
