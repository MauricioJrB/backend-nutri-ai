import { DietType } from '@prisma/client';

export type UserPreferenceProps = {
  id?: string;
  userId: string;
  userWantsSuplements: string;
  userAlreadyUses: string;
  sheduleTrainingStart: string;
  sheduleTrainingEnd: string;
  userHasScale: string;
  dietType: DietType;
  foodRestrictions: string;
  customSuggestionFood: string;
};
