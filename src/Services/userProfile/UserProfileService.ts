import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
  UserProfileResponseDto,
} from '../../dtos/UserProfileDto';
import { UserProfile } from '../../entities/UserProfile';
import { IUserProfileRepository } from '../../repositories/userProfile/IUserProfileRepository';
import { IUserProfileService } from './IUserProfileService';
import { UserProfileMapper } from '../../mappers/UserProfileMapper';

export class UserProfileService implements IUserProfileService {
  private constructor(readonly repository: IUserProfileRepository) {}

  public static build(repository: IUserProfileRepository) {
    return new UserProfileService(repository);
  }

  public async save(
    data: CreateUserProfileDto,
    userId: string,
  ): Promise<UserProfileResponseDto> {
    const userProfile = UserProfileMapper.toEntity(data, userId);

    const userProfileExists = await this.repository.findByUserId(userId);

    if (userProfileExists) {
      throw new Error('User Profile already exists');
    }

    const savedUserProfile = await this.repository.save(userProfile);

    return UserProfileMapper.toResponseDto(savedUserProfile);
  }

  public async findByUserId(userId: string): Promise<UserProfileResponseDto> {
    const userProfile = await this.repository.findByUserId(userId);

    if (!userProfile) throw new Error('User profile not found.');

    return UserProfileMapper.toResponseDto(userProfile);
  }

  public async findEntityByUserId(userId: string): Promise<UserProfile> {
    const userProfile = await this.repository.findByUserId(userId);

    if (!userProfile) throw new Error('User profile not found');

    return userProfile;
  }

  public async update(
    userId: string,
    data: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    const current = await this.repository.findByUserId(userId);

    if (!current || !current.id) throw new Error('User profile not found');

    const updatedEntity = UserProfileMapper.toEntityFromUpdate(current, data);
    const updated = await this.repository.update(current.id, updatedEntity);

    return updated;
  }

  public async delete(userId: string): Promise<void> {
    const userProfile = await this.repository.findByUserId(userId);

    if (!userProfile) throw new Error('User profile not found');

    await this.repository.delete(userId);
  }
}
