import { Macro } from '../entities/Macro';

export type MacroResponseDto = {
  id: string;
  userId: string;
  BMR: number;
  TDEE: number;
  totalKcal: number;
  proteinKcal: number;
  fatKcal: number;
  carbKcal: number;
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  amountWater: number;
};

export class MacroDto {
  public static macroResponse(macro: Macro): MacroResponseDto {
    return {
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
    };
  }
}
