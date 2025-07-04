import { MealProps } from './Meal';
import { FoodItemProps } from './FoodItem';

export type DietProps = {
  id?: string;
  userId: string;
  expectedCalories: number;
  expectedProtein: number;
  expectedCarb: number;
  expectedFat: number;
  meals: (MealProps & { foods: FoodItemProps[] })[];
};
