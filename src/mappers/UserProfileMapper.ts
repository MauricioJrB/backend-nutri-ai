import { UserProfileProps } from '../@types/UserProfile';
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
  UserProfileResponseDto,
} from '../dtos/UserProfileDto';
import { UserProfile } from '../entities/UserProfile';

export class UserProfileMapper {
  public static toEntity(
    dto: CreateUserProfileDto,
    userId: string,
  ): UserProfile {
    return UserProfile.create({
      userId,
      age: dto.age,
      gender: dto.gender,
      height: dto.height,
      weight: dto.weight,
      activityLevel: dto.activityLevel,
      objective: dto.objective,
      activityFrequency: dto.activityFrequency,
    });
  }

  public static toResponseDto(
    userProfile: UserProfile,
  ): UserProfileResponseDto {
    return {
      id: userProfile.id || '',
      userId: userProfile.userId,
      age: userProfile.age,
      gender: userProfile.gender,
      height: userProfile.height,
      weight: userProfile.weight,
      activityLevel: userProfile.activityLevel,
      objective: userProfile.objective,
      activityFrequency: userProfile.activityFrequency,
    };
  }

  public static toEntityFromUpdate(
    current: UserProfile,
    update: UpdateUserProfileDto,
  ): UserProfile {
    return UserProfile.create({
      id: current.id || undefined,
      userId: current.userId,
      age: update.age ?? current.age,
      gender: update.gender ?? current.gender,
      height: update.height ?? current.height,
      weight: update.weight ?? current.weight,
      activityLevel: update.activityLevel ?? current.activityLevel,
      objective: update.objective ?? current.objective,
      activityFrequency: update.activityFrequency ?? current.activityFrequency,
    });
  }

  public static fromPrisma(userProfile: UserProfileProps): UserProfile {
    return UserProfile.create({
      id: userProfile.id || undefined,
      userId: userProfile.userId,
      age: userProfile.age,
      gender: userProfile.gender,
      height: userProfile.height,
      weight: userProfile.weight,
      activityLevel: userProfile.activityLevel,
      objective: userProfile.objective,
      activityFrequency: userProfile.activityFrequency,
    });
  }
}
