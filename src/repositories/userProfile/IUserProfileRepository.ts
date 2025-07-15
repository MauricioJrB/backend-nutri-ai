import { UserProfile } from '../../entities/UserProfile';

export interface IUserProfileRepository {
  save(data: UserProfile): Promise<UserProfile>;
  findByUserId(userId: string): Promise<UserProfile | null>;
  update(id: string, data: UserProfile): Promise<UserProfile>;
  deleteByUserId(userId: string): Promise<void>;
}
