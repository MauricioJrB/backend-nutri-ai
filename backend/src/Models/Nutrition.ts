import { Schema, Model, model, models } from 'mongoose';
import INutrition from '../Interfaces/INutrition';

export default class NutritionODM {
  private static model: Model<INutrition>;

  constructor() {
    if (!NutritionODM.model) {
      const schema = new Schema<INutrition>({
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User_Macro',
          required: true,
        },
        BMR: { type: Number, required: true },
        TDEE: { type: Number, required: true },
        totalCalories: { type: Number, required: true },
        proteinGrams: { type: Number, required: true },
        carbGrams: { type: Number, required: true },
        fatGrams: { type: Number, required: true },
        carbCalories: { type: Number, required: true },
        proteinCalories: { type: Number, required: true },
        fatCalories: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
      });
      NutritionODM.model =
        models.NutritionCalculations ||
        model<INutrition>('Nutrition_Calculations', schema);
    }
  }

  public async create(nutrition: INutrition) {
    return NutritionODM.model.create({ ...nutrition });
  }

  public async getNutritionByUserId(id: string) {
    return NutritionODM.model.findOne({ userId: id });
  }

  public async deleteNutritionById(id: string) {
    return NutritionODM.model.deleteOne({ userId: id });
  }
}
