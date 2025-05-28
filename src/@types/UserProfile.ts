import {
  ActivityFrequency,
  ActivityLevel,
  Gender,
  Objective,
} from '@prisma/client';

export type UserProfileProps = {
  id?: string;
  userId: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  objective: Objective;
  activityFrequency: ActivityFrequency;
};
