import { PrismaClient } from '@prisma/client';
import { Diet } from '../../entities/Diet';
import { IDietRepository } from './IDietRepository';

export class DietRepository implements IDietRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new DietRepository(prisma);
  }

  public async save(data: Diet): Promise<Diet> {
    const diet = await this.prisma.diet.create({
      data: {
        id: data.id || undefined,
        userId: data.userId,
        expectedCalories: data.expectedCalories,
        expectedProtein: data.expectedProtein,
        expectedCarb: data.expectedCarb,
        expectedFat: data.expectedFat,
      },
      include: { meals: { include: { foods: true } } },
    });

    return Diet.create({
      id: diet.id ?? undefined,
      userId: diet.userId,
      expectedCalories: diet.expectedCalories,
      expectedProtein: diet.expectedProtein,
      expectedCarb: diet.expectedCarb,
      expectedFat: diet.expectedFat,
      meals:
        diet.meals?.map((meal) => ({
          id: meal.id,
          dietId: meal.dietId,
          time: meal.time,
          name: meal.name,
          calories: meal.calories,
          foods: meal.foods ?? [],
        })) ?? [],
    });
  }

  public async find(id: string): Promise<Diet | null> {
    const diet = await this.prisma.diet.findFirst({
      where: { id },
      include: { meals: { include: { foods: true } } },
    });

    if (!diet) return null;

    return Diet.create({
      id: diet.id,
      userId: diet.userId,
      expectedCalories: diet.expectedCalories,
      expectedProtein: diet.expectedProtein,
      expectedCarb: diet.expectedCarb,
      expectedFat: diet.expectedFat,
      meals: diet.meals ?? [],
    });
  }

  public async findByUserId(userId: string): Promise<Diet | null> {
    const diet = await this.prisma.diet.findFirst({
      where: { userId },
      include: { meals: { include: { foods: true } } },
    });

    if (!diet) return null;

    return Diet.create({
      id: diet.id,
      userId: diet.userId,
      expectedCalories: diet.expectedCalories,
      expectedProtein: diet.expectedProtein,
      expectedCarb: diet.expectedCarb,
      expectedFat: diet.expectedFat,
      meals: diet.meals ?? [],
    });
  }

  public async update(id: string, data: Diet): Promise<Diet> {
    const diet = await this.prisma.diet.update({
      where: { id },
      include: { meals: { include: { foods: true } } },
      data: {
        userId: data.userId,
        expectedCalories: data.expectedCalories,
        expectedProtein: data.expectedProtein,
        expectedCarb: data.expectedCarb,
        expectedFat: data.expectedFat,
      },
    });

    return Diet.create({
      id: diet.id ?? undefined,
      userId: diet.userId,
      expectedCalories: diet.expectedCalories,
      expectedProtein: diet.expectedProtein,
      expectedCarb: diet.expectedCarb,
      expectedFat: diet.expectedFat,
      meals: diet.meals ?? [],
    });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.diet.deleteMany({
      where: { userId },
    });
  }
}
