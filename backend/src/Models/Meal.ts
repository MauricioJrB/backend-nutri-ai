import { Model, Schema, model, models } from 'mongoose';
import IMeal from '../Interfaces/IMeal';

export default class MealODM {
  private static model: Model<IMeal>;

  constructor() {
    if (!MealODM.model) {
      const schema = new Schema<IMeal>({
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          unique: true,
        },
        meals: [
          {
            time: { type: String, required: true },
            name: { type: String, required: true },
            calories: { type: Number, required: true },
            food: [
              {
                item: { type: String, required: true },
                quantity: { type: Number, required: true },
                protein: { type: Number, required: true },
                carbs: { type: Number, required: true },
                fat: { type: Number, required: true },
              },
            ],
          },
        ],
      });
      MealODM.model = models.Meal || model<IMeal>('Meals', schema);
    }
  }

  public async createOrUpdateMeal(userId: string, meals: IMeal) {
    return MealODM.model.findOneAndUpdate({ userId }, meals, {
      new: true,
      upsert: true,
    });
  }

  public async getMealByUserId(userId: string) {
    const result = await MealODM.model.findOne({ userId });
    if (!result) return null;
    return {
      userId: result.userId,
      meals: result.meals.map((meal) => ({
        time: meal.time,
        name: meal.name,
        calories: meal.calories,
        food: meal.food.map((food) => ({
          item: food.item,
          quantity: food.quantity,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
        })),
      })),
    };
  }

  public async deleteMealById(id: string) {
    return MealODM.model.deleteOne({ userId: id });
  }
}
