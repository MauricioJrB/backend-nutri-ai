import { FoodItemProps } from '../@types/FoodItem';

export class FoodItem {
  private constructor(readonly props: FoodItemProps) {}

  public static create(props: FoodItemProps) {
    return new FoodItem(props);
  }

  public get id(): string | null {
    return this.props.id || null;
  }

  public get mealId(): string {
    return this.props.mealId;
  }

  public get item(): string {
    return this.props.item;
  }

  public get quantity(): string {
    return this.props.quantity;
  }

  public get protein(): number {
    return this.props.protein;
  }

  public get carb(): number {
    return this.props.carb;
  }

  public get fat(): number {
    return this.props.fat;
  }
}
