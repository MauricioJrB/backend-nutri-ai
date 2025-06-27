import {
  CreateUserPreferenceDto,
  UpdateUserPreferenceDto,
  UserPreferenceResponseDto,
} from '../../dtos/UserPreferenceDto';
import { UserPreference } from '../../entities/UserPreference';

export interface IUserPreferenceService {
  save(
    data: CreateUserPreferenceDto,
    userId: string,
  ): Promise<UserPreferenceResponseDto>;
  find(id: string): Promise<UserPreferenceResponseDto>;
  findByUserId(userId: string): Promise<UserPreferenceResponseDto>;
  update(
    userId: string,
    data: UpdateUserPreferenceDto,
  ): Promise<UserPreference>;
  delete(userId: string): Promise<void>;
}
