import mongoose from 'mongoose';
import IMeal from '../Interfaces/IMeal';

export default class MealDomain {
  public userId: mongoose.Types.ObjectId;
  public meals: Array<{
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

  constructor(meals: IMeal) {
    this.userId = meals.userId;
    this.meals = meals.meals.map((meal) => ({
      time: meal.time,
      name: meal.name,
      calories: meal.calories,
      food: meal.food.map((food) => ({
        item: food.item,
        quantity: food.quantity,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
      })),
    }));
  }
}
