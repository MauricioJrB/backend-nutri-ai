import { MacroProps } from '../@types/Macro';
import { MacroResponseDto } from '../dtos/MacroDto';
import { Macro } from '../entities/Macro';

export class MacroMapper {
  public static toResponseDto(macro: Macro): MacroResponseDto {
    return {
      id: macro.id || undefined,
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
    };
  }

  public static fromPrisma(macro: MacroProps): Macro {
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
}
