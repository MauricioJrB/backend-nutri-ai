import { PrismaClient } from '@prisma/client';
import { UserProfile } from '../entities/UserProfile';
import { IUserProfileRepository } from '../interfaces/userProfile/IUserProfileRepository';
import { UserProfileProps } from '../@types/UserProfile';

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

    return UserProfile.create({
      id: userProfile.id,
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

  public async find(id: string): Promise<UserProfile | null> {
    const userProfile = await this.prisma.userProfile.findUnique({
      where: { id },
    });

    if (!userProfile) return null;

    return UserProfile.create({
      id: userProfile.id,
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

  public async findByUserId(userId: string): Promise<UserProfile | null> {
    const userProfile = await this.prisma.userProfile.findFirst({
      where: { userId },
    });

    if (!userProfile) return null;

    return UserProfile.create({
      id: userProfile.id,
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

  public async update(data: Partial<UserProfileProps>): Promise<UserProfile> {
    const userProfile = await this.prisma.userProfile.update({
      where: { id: data.id },
      data,
    });

    return UserProfile.create({
      id: userProfile.id,
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

  public async delete(id: string): Promise<void> {
    await this.prisma.userProfile.delete({ where: { id } });
  }
}
