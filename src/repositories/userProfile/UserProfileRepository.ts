import { UserProfile } from '../../entities/UserProfile';
import { PrismaClient } from '@prisma/client';
import { UserProfileMapper } from '../../mappers/UserProfileMapper';
import { IUserProfileRepository } from './IUserProfileRepository';

export class UserProfileRepository implements IUserProfileRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserProfileRepository(prisma);
  }

  public async save(data: UserProfile): Promise<UserProfile> {
    const userProfile = await this.prisma.userProfile.create({
      data: {
        id: data.id || undefined,
        userId: data.userId,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        activityLevel: data.activityLevel,
        objective: data.objective,
        activityFrequency: data.activityFrequency,
      },
    });

    return UserProfileMapper.fromPrisma(userProfile);
  }

  public async findByUserId(userId: string): Promise<UserProfile | null> {
    const userProfile = await this.prisma.userProfile.findFirst({
      where: { userId },
    });

    if (!userProfile) return null;

    return UserProfileMapper.fromPrisma(userProfile);
  }

  public async update(id: string, data: UserProfile): Promise<UserProfile> {
    const userProfile = await this.prisma.userProfile.update({
      where: { id },
      data: {
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        activityLevel: data.activityLevel,
        objective: data.objective,
        activityFrequency: data.activityFrequency,
      },
    });

    return UserProfileMapper.fromPrisma(userProfile);
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.userProfile.deleteMany({ where: { userId } });
  }
}
