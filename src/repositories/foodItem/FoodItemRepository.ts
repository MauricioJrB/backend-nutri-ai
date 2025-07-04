import { PrismaClient } from '@prisma/client';
import { IFoodItemRepository } from './IFoodItemRepository';
import { FoodItem } from '../../entities/FoodItem';

export class FoodItemRepository implements IFoodItemRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new FoodItemRepository(prisma);
  }

  public async save(data: FoodItem): Promise<FoodItem> {
    const foodItem = await this.prisma.foodItem.create({
      data: {
        id: data.id || undefined,
        mealId: data.mealId,
        item: data.item,
        quantity: data.quantity,
        protein: data.protein,
        carb: data.carb,
        fat: data.fat,
      },
    });

    return FoodItem.create({
      id: foodItem.id ?? undefined,
      mealId: foodItem.mealId,
      item: foodItem.item,
      quantity: foodItem.quantity,
      protein: foodItem.protein,
      carb: foodItem.carb,
      fat: foodItem.fat,
    });
  }

  public async find(id: string): Promise<FoodItem | null> {
    const foodItem = await this.prisma.foodItem.findFirst({
      where: { id },
    });

    if (!foodItem) return null;

    return FoodItem.create({
      id: foodItem.id ?? undefined,
      mealId: foodItem.mealId,
      item: foodItem.item,
      quantity: foodItem.quantity,
      protein: foodItem.protein,
      carb: foodItem.carb,
      fat: foodItem.fat,
    });
  }

  public async findByUserId(userId: string): Promise<FoodItem[]> {
    const foodItems = await this.prisma.foodItem.findMany({
      where: {
        meal: {
          diet: {
            userId,
          },
        },
      },
    });

    return foodItems.map((foodItem) =>
      FoodItem.create({
        id: foodItem.id ?? undefined,
        mealId: foodItem.mealId,
        item: foodItem.item,
        quantity: foodItem.quantity,
        protein: foodItem.protein,
        carb: foodItem.carb,
        fat: foodItem.fat,
      }),
    );
  }

  public async findByMealId(mealId: string): Promise<FoodItem[]> {
    const foodItems = await this.prisma.foodItem.findMany({
      where: { mealId },
    });

    return foodItems.map((foodItem) =>
      FoodItem.create({
        id: foodItem.id ?? undefined,
        mealId: foodItem.mealId,
        item: foodItem.item,
        quantity: foodItem.quantity,
        protein: foodItem.protein,
        carb: foodItem.carb,
        fat: foodItem.fat,
      }),
    );
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.foodItem.delete({
      where: { id },
    });
  }

  public async deleteByMealId(mealId: string): Promise<void> {
    await this.prisma.foodItem.deleteMany({
      where: { mealId },
    });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.foodItem.deleteMany({
      where: {
        meal: {
          diet: {
            userId,
          },
        },
      },
    });
  }
}
