import { MacroProps } from '../@types/Macro';

export class Macro {
  private constructor(readonly props: MacroProps) {}

  public static create(props: MacroProps) {
    return new Macro(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get BMR(): number {
    return this.props.BMR;
  }

  public get TDEE(): number {
    return this.props.TDEE;
  }

  public get totalKcal(): number {
    return this.props.totalKcal;
  }

  public get proteinKcal(): number {
    return this.props.proteinKcal;
  }

  public get fatKcal(): number {
    return this.props.fatKcal;
  }

  public get carbKcal(): number {
    return this.props.carbKcal;
  }

  public get proteinGrams(): number {
    return this.props.proteinGrams;
  }

  public get fatGrams(): number {
    return this.props.fatGrams;
  }

  public get carbGrams(): number {
    return this.props.carbGrams;
  }

  public get amountWater(): number {
    return this.props.amountWater;
  }
}
