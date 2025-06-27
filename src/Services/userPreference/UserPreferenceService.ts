import {
  CreateUserPreferenceDto,
  UpdateUserPreferenceDto,
  UserPreferenceResponseDto,
} from '../../dtos/UserPreferenceDto';
import { UserPreference } from '../../entities/UserPreference';
import { UserPreferenceMapper } from '../../mappers/UserPreferenceMapper';
import { IUserPreferenceRepository } from '../../repositories/userPreference/IUserPreferenceRepositoy';
import { IUserPreferenceService } from './IUserPreferenceService';

export class UserPreferenceService implements IUserPreferenceService {
  private constructor(readonly repository: IUserPreferenceRepository) {}

  public static build(repository: IUserPreferenceRepository) {
    return new UserPreferenceService(repository);
  }

  public async save(
    data: CreateUserPreferenceDto,
    userId: string,
  ): Promise<UserPreferenceResponseDto> {
    const userPreference = UserPreferenceMapper.toEntity(data, userId);

    const userPreferenceExists = await this.repository.findByUserId(userId);

    if (userPreferenceExists)
      throw new Error('User preference already exists for this user');

    const savedUserPreference = await this.repository.save(userPreference);

    return UserPreferenceMapper.toResponseDto(savedUserPreference);
  }

  find(id: string): Promise<UserPreferenceResponseDto> {
    throw new Error('Method not implemented');
  }

  public async findByUserId(
    userId: string,
  ): Promise<UserPreferenceResponseDto> {
    const userPreference = await this.repository.findByUserId(userId);

    if (!userPreference) throw new Error('User preference not found');

    return UserPreferenceMapper.toResponseDto(userPreference);
  }

  public async update(
    userId: string,
    data: UpdateUserPreferenceDto,
  ): Promise<UserPreference> {
    const current = await this.repository.findByUserId(userId);

    if (!current || !current.id) throw new Error('User preference not found');

    const updatedEntity = UserPreferenceMapper.toEntityFromUpdate(
      current,
      data,
    );

    const updated = await this.repository.update(current.id, updatedEntity);

    return updated;
  }

  public async delete(userId: string): Promise<void> {
    const userPreference = await this.repository.findByUserId(userId);

    if (!userPreference) throw new Error('User preference not found');

    await this.repository.delete(userId);
  }
}
