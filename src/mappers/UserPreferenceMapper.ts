import { UserPreferenceProps } from '../@types/UserPreference';
import {
  CreateUserPreferenceDto,
  UpdateUserPreferenceDto,
  UserPreferenceResponseDto,
} from '../dtos/UserPreferenceDto';
import { UserPreference } from '../entities/UserPreference';

export class UserPreferenceMapper {
  public static toEntity(
    dto: CreateUserPreferenceDto,
    userId: string,
  ): UserPreference {
    return UserPreference.create({
      userId,
      userWantsSuplements: dto.userWantsSuplements,
      userAlreadyUses: dto.userAlreadyUses,
      sheduleTrainingStart: dto.sheduleTrainingStart,
      sheduleTrainingEnd: dto.sheduleTrainingEnd,
      userHasScale: dto.userHasScale,
      dietType: dto.dietType,
      foodRestrictions: dto.foodRestrictions,
      customSuggestionFood: dto.customSuggestionFood,
    });
  }

  public static toResponseDto(
    userPreference: UserPreference,
  ): UserPreferenceResponseDto {
    return {
      id: userPreference.id || '',
      userId: userPreference.userId,
      userWantsSuplements: userPreference.userWantsSuplements,
      userAlreadyUses: userPreference.userAlreadyUses,
      sheduleTrainingStart: userPreference.sheduleTrainingStart,
      sheduleTrainingEnd: userPreference.sheduleTrainingEnd,
      userHasScale: userPreference.userHasScale,
      dietType: userPreference.dietType,
      foodRestrictions: userPreference.foodRestrictions,
      customSuggestionFood: userPreference.customSuggestionFood,
    };
  }

  public static toEntityFromUpdate(
    current: UserPreference,
    update: UpdateUserPreferenceDto,
  ): UserPreference {
    return UserPreference.create({
      id: current.id || undefined,
      userId: current.userId,
      userWantsSuplements:
        update.userWantsSuplements ?? current.userWantsSuplements,
      userAlreadyUses: update.userAlreadyUses ?? current.userAlreadyUses,
      sheduleTrainingStart:
        update.sheduleTrainingStart ?? current.sheduleTrainingStart,
      sheduleTrainingEnd:
        update.sheduleTrainingEnd ?? current.sheduleTrainingEnd,
      userHasScale: update.userHasScale ?? current.userHasScale,
      dietType: update.dietType ?? current.dietType,
      foodRestrictions: update.foodRestrictions ?? current.foodRestrictions,
      customSuggestionFood:
        update.customSuggestionFood ?? current.customSuggestionFood,
    });
  }

  public static fromPrisma(
    userPreference: UserPreferenceProps,
  ): UserPreference {
    return UserPreference.create({
      id: userPreference.id || undefined,
      userId: userPreference.userId,
      userWantsSuplements: userPreference.userWantsSuplements,
      userAlreadyUses: userPreference.userAlreadyUses,
      sheduleTrainingStart: userPreference.sheduleTrainingStart,
      sheduleTrainingEnd: userPreference.sheduleTrainingEnd,
      userHasScale: userPreference.userHasScale,
      dietType: userPreference.dietType,
      foodRestrictions: userPreference.foodRestrictions,
      customSuggestionFood: userPreference.customSuggestionFood,
    });
  }
}
