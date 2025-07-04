import { z } from 'zod';
import { DietType } from '@prisma/client';

export const userPreferenceSchemas = {
  body: z.object({
    userWantsSuplements: z
      .string()
      .min(1, 'Invalid field, should be "sim" or "não"'),
    userAlreadyUses: z.string().min(1, 'IN'),
    sheduleTrainingStart: z
      .string()
      .min(1, 'Invalid field, should be a valid time'),
    sheduleTrainingEnd: z
      .string()
      .min(1, 'Invalid field, should be a valid time'),
    dietType: z.nativeEnum(DietType, {
      errorMap: () => ({
        message:
          'Diet type must be one of: "NORMAL", "VEGETARIAN", "VEGAN" or "Ketogenic"',
      }),
    }),
    foodRestrictions: z
      .string()
      .min(1, 'Invalid field, should be a food restriction or none'),
    customSuggestionFood: z
      .string()
      .min(1, 'Invalid field, should be a food suggestion or none'),
  }),
};
