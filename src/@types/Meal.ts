import { FoodItemProps } from './FoodItem';

export type MealProps = {
  id?: string;
  dietId: string;
  time: string;
  name: string;
  calories: number;
  foods?: FoodItemProps[];
};
