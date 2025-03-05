import mongoose from 'mongoose';
import IMeal from '../Interfaces/IMeal';
import IUser from '../Interfaces/IUser';
import IMacronutrients from '../Interfaces/IMacronutrients';
import UserService from './UserService';
import MacronutrientsService from './MacronutrientsService';
import MealDomain from '../Domains/MealDomain';
import MealODM from '../Models/Meal';

import { GoogleGenerativeAI } from '@google/generative-ai';

export default class MealService {
  private userService = new UserService();
  private macronutrientsService = new MacronutrientsService();
  private mealODM = new MealODM();

  private async fetchGeneratedMeal(user: IUser, macro: IMacronutrients) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const response = await model.generateContent(`
        Crie uma dieta completa para uma pessoa com as seguintes características:
        - Nome: ${user.username}
        - Sexo: ${user.gender}
        - Peso atual: ${user.weight}kg
        - Altura: ${user.height}m
        - Idade: ${user.age} anos
        - Objetivo: ${user.objective}
        - Nível de atividade: ${user.level}
        - Total de calorias diárias: ${macro.totalCalories}
        - Distribuição de macro: 
          - Proteínas: ${macro.proteinGrams}g (${macro.proteinCalories} kcal)
          - Carboidratos: ${macro.carbGrams}g (${macro.carbCalories} kcal)
          - Gorduras: ${macro.fatGrams}g (${macro.fatCalories} kcal
        Com base nesses parâmetros, crie uma dieta detalhada e precisa. Retorne o resultado em JSON, contendo:
        - Propriedade "meals", uma array onde cada objeto é uma refeição, contendo:
          - Propriedade "time" (horário da refeição).
          - Propriedade "name" (nome da refeição).
          - Propriedade "calories" (caloria total de cada refeição)
          - Propriedade "food", uma array com os alimentos dessa refeição, contendo como propriedades:
          - Propriedade "item" (nome do alimento).
          - Propriedade "quantity" (quantidade em gramas do alimento)
          - Propriedade "protein" (quantidade em gramas de proteína que o alimento possui)
          - Propriedade "carbs" (quantidade em gramas de carboidratos que o alimento possui)
          - Propriedade "fat" (quantidade em gramas de gorduras que o alimento possui)
          E quantidades que respeitem os valores de macronutrientes e calorias passados.
        - Propriedade opcional "suplements", uma array contendo sugestões de suplementos indicados com base no sexo e objetivo da pessoa, também respeitando os valores de macronutrientes.
        Não inclua nenhuma observação ou explicação adicional no retorno. Apenas retorne o JSON gerado e não utilize acentos nas propriedades.
        `);

    if (!response.response || !response.response.candidates) {
      throw new Error('Failed to generate meal from AI');
    }
    const jsonText = response.response.candidates[0]?.content.parts[0]
      .text as string;
    try {
      return JSON.parse(
        jsonText
          .replace(/```\w*\n/g, '')
          .replace(/```/g, '')
          .trim(),
      );
    } catch (error) {
      throw new Error('Failed to parse generated diet JSON');
    }
  }

  private mapGeneratedMeals(userId: string, generatedMeals: IMeal): IMeal {
    if (!generatedMeals.meals)
      throw new Error('Genereted diet does not contain meal');
    return {
      userId: new mongoose.Types.ObjectId(userId),
      meals: generatedMeals.meals.map((meal) => ({
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

  public async createMeal(meal: IMeal) {
    return new MealDomain(meal);
  }

  public async create(userId: string): Promise<IMeal> {
    const user: IUser | null = await this.userService.getUserById(userId);
    if (!user) throw new Error('User not found');

    const macronutrients: IMacronutrients | null =
      await this.macronutrientsService.getMacronutrientsByUserId(userId);

    if (!macronutrients) throw new Error('Macronutrients not found');

    const generatedMeals = await this.fetchGeneratedMeal(user, macronutrients);
    const mappedMeals = this.mapGeneratedMeals(userId, generatedMeals);
    const meals = await this.mealODM.createOrUpdateMeal(userId, mappedMeals);

    return meals;
  }

  public async getMealByUserId(userId: string) {
    const meals = await this.mealODM.getMealByUserId(userId);
    if (meals === null) throw new Error('Meals not found');
    return meals;
  }

  public async deleteMealById(userId: string) {
    return this.mealODM.deleteMealById(userId);
  }
}
