import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
  UserProfileResponseDto,
} from '../../dtos/UserProfileDto';
import { UserProfile } from '../../entities/UserProfile';

export interface IUserProfileService {
  save(
    data: CreateUserProfileDto,
    userId: string,
  ): Promise<UserProfileResponseDto>;
  findByUserId(userId: string): Promise<UserProfileResponseDto>;
  update(userId: string, data: UpdateUserProfileDto): Promise<UserProfile>;
  delete(userId: string): Promise<void>;
}
