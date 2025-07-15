import { PrismaClient } from '@prisma/client';
import { IMacroRepository } from './IMacroRepository';
import { Macro } from '../../entities/Macro';
import { MacroMapper } from '../../mappers/MacroMapper';

export class MacroRepository implements IMacroRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new MacroRepository(prisma);
  }

  public async save(data: Macro): Promise<Macro> {
    const macro = await this.prisma.macro.create({
      data: {
        id: data.id || undefined,
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

    return MacroMapper.fromPrisma(macro);
  }

  public async findByUserId(userId: string): Promise<Macro | null> {
    const macro = await this.prisma.macro.findFirst({ where: { userId } });

    if (!macro) return null;

    return MacroMapper.fromPrisma(macro);
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.macro.deleteMany({ where: { userId } });
  }
}
