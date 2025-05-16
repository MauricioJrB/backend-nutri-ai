import { PrismaClient } from '@prisma/client';
import { Macro } from '../entities/Macro';
import { IMacroRepository } from '../interfaces/macro/IMacroRepository';

export class MacroRepository implements IMacroRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new MacroRepository(prisma);
  }

  public async save(data: Macro): Promise<Macro> {
    const macro = await this.prisma.macro.create({
      data: {
        id: data.id,
        userId: data.userId,
        BMR: data.BMR,
        TDEE: data.TDEE,
        totalKcal: data.totalKcal,
        proteinKcal: data.proteinKcal,
        fatKcal: data.fatKcal,
        carbKcal: data.carbKcal,
        proteinGrams: data.proteinGrams,
        fatGrams: data.fatGrams,
        carbGrams: data.carbGrams,
        amountWater: data.amountWater,
      },
    });

    return Macro.create({
      id: macro.id,
      userId: macro.userId,
      BMR: macro.BMR,
      TDEE: macro.TDEE,
      totalKcal: macro.totalKcal,
      proteinKcal: macro.proteinKcal,
      fatKcal: macro.fatKcal,
      carbKcal: macro.carbKcal,
      proteinGrams: macro.proteinGrams,
      fatGrams: macro.fatGrams,
      carbGrams: macro.carbGrams,
      amountWater: macro.amountWater,
    });
  }

  public async find(id: string): Promise<Macro | null> {
    const macro = await this.prisma.macro.findUnique({ where: { id } });

    if (!macro) return null;

    return Macro.create({
      id: macro.id,
      userId: macro.userId,
      BMR: macro.BMR,
      TDEE: macro.TDEE,
      totalKcal: macro.totalKcal,
      proteinKcal: macro.proteinKcal,
      fatKcal: macro.fatKcal,
      carbKcal: macro.carbKcal,
      proteinGrams: macro.proteinGrams,
      fatGrams: macro.fatGrams,
      carbGrams: macro.carbGrams,
      amountWater: macro.amountWater,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.macro.delete({ where: { id } });
  }
}
