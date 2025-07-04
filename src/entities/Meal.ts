import { MealProps } from '../@types/Meal';
import { FoodItemProps } from '../@types/FoodItem';

export class Meal {
  private constructor(readonly props: MealProps) {}

  public static create(props: MealProps) {
    return new Meal(props);
  }

  public get id(): string | null {
    return this.props.id || null;
  }

  public get dietId(): string {
    return this.props.dietId;
  }

  public get time(): string {
    return this.props.time;
  }

  public get name(): string {
    return this.props.name;
  }

  public get calories(): number {
    return this.props.calories;
  }

  public get foods(): FoodItemProps[] | undefined {
    return this.props.foods;
  }
}
