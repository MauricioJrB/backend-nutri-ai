import { GoogleGenAI } from '@google/genai';
import { config } from '../../../config';
import { UserPreference } from '../../entities/UserPreference';
import { Macro } from '../../entities/Macro';
import { UserProfile } from '../../entities/UserProfile';

export class GenerateDiet {
  private async generateDietByGenAI(prompt: string) {
    try {
      const ai = new GoogleGenAI({
        apiKey: config.apiGeminiKey,
      });

      const configResponse = {
        responseMimeType: 'text/plain',
      };
      const model = 'gemini-2.0-flash';

      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ];

      const response = await ai.models.generateContentStream({
        model,
        config: configResponse,
        contents,
      });
      let fullResponse = '';

      for await (const chunk of response) {
        if (chunk.text) {
          fullResponse += chunk.text;
        }
      }
      return fullResponse;
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content');
    }
  }

  public async buildDiet(
    userProfile: UserProfile,
    userPreference: UserPreference,
    userMacros: Macro,
  ) {
    try {
      const { age, gender, weight, height, objective, activityLevel } =
        userProfile;

      const {
        dietType,
        foodRestrictions,
        sheduleTrainingStart,
        sheduleTrainingEnd,
        userWantsSuplements,
        userAlreadyUses,
        customSuggestionFood,
      } = userPreference;
      const {
        totalKcal,
        proteinKcal,
        carbKcal,
        fatKcal,
        proteinGrams,
        carbGrams,
        fatGrams,
      } = userMacros;

      const response = await this.generateDietByGenAI(`
      Tipo de dieta: ${dietType}
        Restrições alimentares: ${foodRestrictions}
        IMPORTANTE: Crie uma dieta que **obrigatoriamente siga o tipo de dieta informado acima**. Isso significa:
          Se for "Cetogenica", mantenha a dieta com altíssima ingestão de gorduras boas, consumo moderado de proteínas e **baixíssimo de carboidratos**.
          Se ${dietType} for "Vegana", **não inclua nenhum alimento de origem animal** (ex: carne, leite, ovos, mel etc.).
          Se ${dietType} for "Vegetariana", **não inclua carnes**, mas **pode incluir ovos e laticínios**.
          Se ${dietType} for "Dieta com restricoes especificas", **nunca inclua os alimentos listados em ${foodRestrictions}**.
        Caso ${dietType} seja diferente de "Normal", adapte toda a dieta de acordo com as definições acima. Evite completamente os alimentos listados em ${foodRestrictions}.
        Crie uma dieta completa para uma pessoa com as seguintes características:
          Sexo: ${gender}, Peso atual: ${weight}kg, Altura: ${height}m, Idade: ${age} anos, Objetivo: ${objective}, Nível de atividade: ${activityLevel}.
          Horário de treino: das ${sheduleTrainingStart} até as ${sheduleTrainingEnd}.
          SE horário de treino for de manhã, não sugira o pós-treino com arroz e feijão.
          As calorias de cada refeição deve conter exatamente os valores a seguir das calorias diárias: 
          Total de calorias diárias: ${totalKcal}
            Proteínas: ${proteinGrams}g (${proteinKcal} kcal)
            Carboidratos: ${carbGrams}g (${carbKcal} kcal)
            Gorduras: ${fatGrams}g (${fatKcal} kcal)
        Caso ${customSuggestionFood} nao for 'nenhuma', utilize esses alimentos como base para a dieta, se nao, com base nos parâmetros existentes, crie uma dieta detalhada e precisa.
        Retorne o resultado em JSON com a seguinte estrutura:
       { "meals": [{ "time": "07:00", "name": "Cafe da Manha", "calories": 0, "foods": [ { "item": "nome do alimento", "quantity": 0, "protein": 0, "carb": 0, "fat": 0 } ] ] }
          **Observações:**
          - Na propriedade "quantity" utilize o formato "1 unidade pequena", "1 fatia média", "1 colher de sopa", "1 xícara", "1 concha grande", junto com a quantidade em gramas quando necessário. Exemplo: "1 fatia média (50g)", "1 colher de sopa (15g)", "1 xícara (200g)", "1 concha grande (250g)". 
          - Se sugerir Arroz e Feijão utilize a quantidade de 1 concha grande (250g) para o arroz e 1 concha grande (200g) para o feijão.
          - "protein", "carb", "fat": quantidades em gramas. Sempre inclua todas, mesmo que sejam 0.
          - nas refeições anterior a ${sheduleTrainingStart} coloque "name": Pré-treino e depois coloque "name": "Pós-treino"
       **IMPORTANTE SOBRE SUPLEMENTOS:**
        - O usuário deseja usar suplementos: ${userWantsSuplements}
        - O usuário já utiliza os seguintes suplementos: ${userAlreadyUses}
        - Instruções:
        - Se ${userWantsSuplements} for 'nao' e ${userAlreadyUses} for 'nao', não inclua suplementos.
        - Se  ${userWantsSuplements} for 'sim' e ${userAlreadyUses} for 'nao' inclua suplementos úteis para alcançar o objetivo (${objective}).
        - Se ${userWantsSuplements} for 'nao' e ${userAlreadyUses} for 'sim', inclua apenas os suplementos já utilizados pelo usuário e não indique nada.
        - Sempre inclua **todos os suplementos listados em "${userAlreadyUses}"**.
          - Todos os suplementos devem ser inseridos na propriedade "foods", dentro das refeições apropriadas (ex: Whey no pós-treino, Multivitamínico no café da manhã, Creatina no pós-treino).
        Não inclua nenhuma explicação ou comentário adicional. Apenas retorne o JSON com a estrutura solicitada.
        `);

      const responseString = response
        .replace(/```\w*\n/g, '')
        .replace(/\n```/g, '')
        .trim();

      const diet = JSON.parse(responseString);
      return diet;
    } catch (error) {
      console.error('Erro ao gerar dieta:', error);
      throw new Error('Falha ao gerar dieta');
    }
  }
}
