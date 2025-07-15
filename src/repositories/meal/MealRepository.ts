import { PrismaClient } from '@prisma/client';
import { Meal } from '../../entities/Meal';
import { IMealRepository } from './IMealRepository';

export class MealRepository implements IMealRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new MealRepository(prisma);
  }

  public async save(data: Meal): Promise<Meal> {
    const meal = await this.prisma.meal.create({
      data: {
        id: data.id || undefined,
        dietId: data.dietId,
        time: data.time,
        name: data.name,
        calories: data.calories,
      },
      include: {
        foods: true,
      },
    });

    return Meal.create({
      id: meal.id,
      dietId: meal.dietId,
      time: meal.time,
      name: meal.name,
      calories: meal.calories,
      foods: meal.foods ?? [],
    });
  }

  public async find(id: string): Promise<Meal | null> {
    const meal = await this.prisma.meal.findFirst({
      where: { id },
      include: {
        foods: true,
      },
    });

    if (!meal) return null;

    return Meal.create({
      id: meal.id,
      dietId: meal.dietId,
      time: meal.time,
      name: meal.name,
      calories: meal.calories,
      foods: meal.foods ?? [],
    });
  }

  public async findByUserId(userId: string): Promise<Meal[]> {
    const meals = await this.prisma.meal.findMany({
      where: {
        diet: {
          userId,
        },
      },
      include: {
        foods: true,
      },
    });

    return meals.map((meal) =>
      Meal.create({
        id: meal.id ?? undefined,
        dietId: meal.dietId,
        time: meal.time,
        name: meal.name,
        calories: meal.calories,
        foods: meal.foods ?? [],
      }),
    );
  }

  public async findByDietId(dietId: string): Promise<Meal[]> {
    const meals = await this.prisma.meal.findMany({
      where: { dietId },
      include: {
        foods: true,
      },
    });

    return meals.map((meal) =>
      Meal.create({
        id: meal.id,
        dietId: meal.dietId,
        time: meal.time,
        name: meal.name,
        calories: meal.calories,
        foods: meal.foods ?? [],
      }),
    );
  }

  public async update(id: string, data: Meal): Promise<Meal> {
    const meal = await this.prisma.meal.update({
      where: { id },
      data: {
        dietId: data.dietId,
        time: data.time,
        name: data.name,
        calories: data.calories,
      },
      include: {
        foods: true,
      },
    });

    return Meal.create({
      id: meal.id ?? undefined,
      dietId: meal.dietId,
      time: meal.time,
      name: meal.name,
      calories: meal.calories,
      foods: meal.foods ?? [],
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.meal.delete({
      where: { id },
    });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    const meals = await this.prisma.meal.findMany({
      where: { diet: { userId } },
    });

    for (const meal of meals) {
      await this.delete(meal.id);
    }
  }
}
