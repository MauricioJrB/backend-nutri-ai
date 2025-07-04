import { CreateFoodItemDto } from './FoodItemDto';

export type CreateMealDto = {
  time: string;
  name: string;
  calories: number;
  foods: CreateFoodItemDto[];
};
