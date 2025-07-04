import { FoodItem } from '../../entities/FoodItem';

export interface IFoodItemRepository {
  save(data: FoodItem): Promise<FoodItem>;
  find(id: string): Promise<FoodItem | null>;
  findByUserId(userId: string): Promise<FoodItem[]>;
  findByMealId(mealId: string): Promise<FoodItem[]>;
  delete(id: string): Promise<void>;
  deleteByMealId(mealId: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
