import {
  ActivityFrequency,
  ActivityLevel,
  Gender,
  Objective,
} from '@prisma/client';
import { z } from 'zod';

export const userProfileSchemas = {
  body: z.object({
    age: z.number(),
    gender: z.nativeEnum(Gender, {
      errorMap: () => ({
        message: 'Invalid gender',
      }),
    }),
    height: z.number(),
    weight: z.number(),
    activityLevel: z.nativeEnum(ActivityLevel, {
      errorMap: () => ({
        message: 'Invalid activity level',
      }),
    }),
    objective: z.nativeEnum(Objective, {
      errorMap: () => ({
        message: 'Invalid objective',
      }),
    }),
    activityFrequency: z.nativeEnum(ActivityFrequency, {
      errorMap: () => ({
        message: 'Invalid activity frequency',
      }),
    }),
  }),
};
