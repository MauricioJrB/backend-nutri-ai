export type MacroResponseDto = {
  id?: string;
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
