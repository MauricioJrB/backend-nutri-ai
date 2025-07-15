import { PrismaClient } from '@prisma/client';
import { UserPreference } from '../../entities/UserPreference';
import { IUserPreferenceRepository } from './IUserPreferenceRepositoy';
import { UserPreferenceMapper } from '../../mappers/UserPreferenceMapper';

export class UserPreferenceRepository implements IUserPreferenceRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserPreferenceRepository(prisma);
  }

  public async save(data: UserPreference): Promise<UserPreference> {
    const userPreference = await this.prisma.userPreference.create({
      data: {
        id: data.id || undefined,
        userId: data.userId,
        userWantsSuplements: data.userWantsSuplements,
        userAlreadyUses: data.userAlreadyUses,
        sheduleTrainingStart: data.sheduleTrainingStart,
        sheduleTrainingEnd: data.sheduleTrainingEnd,
        dietType: data.dietType,
        foodRestrictions: data.foodRestrictions,
        customSuggestionFood: data.customSuggestionFood,
      },
    });

    return UserPreferenceMapper.fromPrisma(userPreference);
  }

  public async find(id: string): Promise<UserPreference | null> {
    const userPreference = await this.prisma.userPreference.findFirst({
      where: { id },
    });

    if (!userPreference) return null;

    return UserPreferenceMapper.fromPrisma(userPreference);
  }

  public async findByUserId(userId: string): Promise<UserPreference | null> {
    const userPreference = await this.prisma.userPreference.findFirst({
      where: { userId },
    });

    if (!userPreference) return null;

    return UserPreferenceMapper.fromPrisma(userPreference);
  }

  public async update(
    id: string,
    data: UserPreference,
  ): Promise<UserPreference> {
    const userPreference = await this.prisma.userPreference.update({
      where: { id },
      data: {
        userWantsSuplements: data.userWantsSuplements,
        userAlreadyUses: data.userAlreadyUses,
        sheduleTrainingStart: data.sheduleTrainingStart,
        sheduleTrainingEnd: data.sheduleTrainingEnd,
        dietType: data.dietType,
        foodRestrictions: data.foodRestrictions,
        customSuggestionFood: data.customSuggestionFood,
      },
    });

    return UserPreferenceMapper.fromPrisma(userPreference);
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.userPreference.deleteMany({
      where: { userId },
    });
  }
}
