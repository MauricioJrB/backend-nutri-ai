import { DietProps } from '../@types/Diet';
import { MealProps } from '../@types/Meal';
import { FoodItemProps } from '../@types/FoodItem';

export class Diet {
  private constructor(readonly props: DietProps) {}

  public static create(props: DietProps) {
    return new Diet(props);
  }

  public get id(): string | null {
    return this.props.id || null;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get expectedCalories(): number {
    return this.props.expectedCalories;
  }

  public get expectedProtein(): number {
    return this.props.expectedProtein;
  }

  public get expectedCarb(): number {
    return this.props.expectedCarb;
  }

  public get expectedFat(): number {
    return this.props.expectedFat;
  }

  public get meals(): (MealProps & { foods: FoodItemProps[] })[] {
    return this.props.meals;
  }
}
