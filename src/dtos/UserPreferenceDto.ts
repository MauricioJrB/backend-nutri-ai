import { DietType } from '@prisma/client';
import { UserPreferenceProps } from '../@types/UserPreference';

export type CreateUserPreferenceDto = {
  userWantsSuplements: string;
  userAlreadyUses: string;
  sheduleTrainingStart: string;
  sheduleTrainingEnd: string;
  userHasScale: string;
  dietType: DietType;
  foodRestrictions: string;
  customSuggestionFood: string;
};

export type UserPreferenceResponseDto = {
  id: string;
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

export type UpdateUserPreferenceDto = Partial<UserPreferenceProps>;
