import { CreateMealDto } from './MealDto';

export type CreateDietDto = {
  expectedCalories: number;
  expectedProtein: number;
  expectedCarb: number;
  expectedFat: number;
  meals: CreateMealDto[];
};

export type DietResponseDto = {
  id: string;
  userId: string;
  expectedCalories: number;
  expectedProtein: number;
  expectedCarb: number;
  expectedFat: number;
  meals: {
    time: string;
    name: string;
    calories: number;
    foods: {
      item: string;
      quantity: string;
      protein: number;
      carb: number;
      fat: number;
    }[];
  }[];
};
