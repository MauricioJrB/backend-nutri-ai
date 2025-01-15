import { Schema, Model, model, models } from 'mongoose';
import IMacronutrients from '../Interfaces/IMacronutrients';

export default class MacronutrientsODM {
  private static model: Model<IMacronutrients>;

  constructor() {
    if (!MacronutrientsODM.model) {
      const schema = new Schema<IMacronutrients>({
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
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
        amountWater: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
      });
      MacronutrientsODM.model =
        models.MacronutrientsCalculations ||
        model<IMacronutrients>('Macronutrients', schema);
    }
  }

  public async create(macronutrients: IMacronutrients) {
    return MacronutrientsODM.model.create({ ...macronutrients });
  }

  public async getMacronutrientsByUserId(id: string) {
    return MacronutrientsODM.model.findOne({ userId: id });
  }

  public async deleteMacronutrientsById(id: string) {
    return MacronutrientsODM.model.deleteOne({ userId: id });
  }
}
