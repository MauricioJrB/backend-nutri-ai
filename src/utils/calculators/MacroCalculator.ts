import { Macro } from '../../entities/Macro';
import { UserProfile } from '../../entities/UserProfile';

export class MacroCalculator {
  private getBMR(gender: string, weight: number, height: number, age: number) {
    const heightCM = height * 100;

    return gender === 'Masculino'
      ? 88.362 + 13.397 * weight + 4.799 * heightCM - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * heightCM - 4.33 * age;
  }

  private verifyActivityLevel(activityLevel: string) {
    if (activityLevel === 'Sedentario') {
      return 1.2;
    } else if (activityLevel === 'PoucoAtivo') {
      return 1.375;
    } else if (activityLevel === 'ModeradamenteAtivo') {
      return 1.55;
    } else if (activityLevel === 'MuitoAtivo') {
      return 1.725;
    } else {
      return 1.9;
    }
  }

  private adjustCaloriesByObjective(objective: string, TDEE: number) {
    if (objective === 'PerderPeso') {
      return TDEE * 0.8;
    } else if (objective === 'GanharMusculo') {
      return TDEE * 1.2;
    } else {
      return TDEE;
    }
  }

  public calculateMacro(userProfile: UserProfile): Macro {
    const { userId, age, gender, height, weight, activityLevel, objective } =
      userProfile;

    const BMR = this.getBMR(gender, weight, height, age);
    const activityFactor = this.verifyActivityLevel(activityLevel);

    const TDEE = BMR * activityFactor;
    const totalKcal = this.adjustCaloriesByObjective(objective, TDEE);

    const proteinGrams = 2.2 * weight;
    const fatGrams = 0.9 * weight;

    const proteinKcal = proteinGrams * 4;
    const fatKcal = fatGrams * 9;
    const carbKcal = totalKcal - proteinKcal - fatKcal;

    const carbGrams = carbKcal / 4;

    const amountWater = (40 * weight) / 1000;

    return Macro.create({
      id: undefined,
      userId,
      BMR: parseFloat(BMR.toFixed(2)),
      TDEE: parseFloat(TDEE.toFixed(2)),
      totalKcal: parseFloat(totalKcal.toFixed(2)),
      proteinKcal: parseFloat(proteinKcal.toFixed(2)),
      fatKcal: parseFloat(fatKcal.toFixed(2)),
      carbKcal: parseFloat(carbKcal.toFixed(2)),
      proteinGrams: parseFloat(proteinGrams.toFixed(2)),
      fatGrams: parseFloat(fatGrams.toFixed(2)),
      carbGrams: parseFloat(carbGrams.toFixed(2)),
      amountWater,
    });
  }
}
