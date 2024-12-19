import { Schema, Model, model, models } from 'mongoose';
import INutritionCalculations from '../Interfaces/INutritionCalculations';

export default class NutritionODM {
  private static model: Model<INutritionCalculations>;

  constructor() {
    const schema = new Schema<INutritionCalculations>({
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User_Macro',
        required: true,
      },
      BMR: { type: Number, required: true },
      TDEE: { type: Number, required: true },
      totalCalories: { type: Number, required: true },
      proteinGrams: { type: Number, required: true },
      carbsGrams: { type: Number, required: true },
      fatsGrams: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now },
    });
    NutritionODM.model =
      models.NutritionCalculations ||
      model<INutritionCalculations>('Nutrition_Calculations', schema);
  }

  public async create(nutrition: INutritionCalculations) {
    return NutritionODM.model.create({ ...nutrition });
  }

  public async getNutritionByUserId(id: string) {
    return NutritionODM.model.findOne({ userId: id });
  }

  public async deleteNutritionById(id: string) {
    return NutritionODM.model.deleteOne({ _id: id });
  }
}
