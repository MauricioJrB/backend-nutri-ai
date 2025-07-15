import {
  CreateUserPreferenceDto,
  UpdateUserPreferenceDto,
  UserPreferenceResponseDto,
} from '../../dtos/UserPreferenceDto';

export interface IUserPreferenceService {
  save(
    data: CreateUserPreferenceDto,
    userId: string,
  ): Promise<UserPreferenceResponseDto>;
  findByUserId(userId: string): Promise<UserPreferenceResponseDto>;
  update(
    userId: string,
    data: UpdateUserPreferenceDto,
  ): Promise<UserPreferenceResponseDto>;
  deleteByUserId(userId: string): Promise<void>;
}
