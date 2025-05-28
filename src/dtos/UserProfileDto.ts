import { UserProfileProps } from '../@types/UserProfile';
import {
  ActivityFrequency,
  ActivityLevel,
  Gender,
  Objective,
} from '@prisma/client';

export type CreateUserProfileDto = {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  objective: Objective;
  activityFrequency: ActivityFrequency;
};

export type UserProfileResponseDto = {
  id: string;
  userId: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  objective: Objective;
  activityFrequency: ActivityFrequency;
};

export type UpdateUserProfileDto = Partial<UserProfileProps>;
