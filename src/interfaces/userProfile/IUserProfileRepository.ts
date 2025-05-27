import { UserProfile } from '../../entities/UserProfile';

export interface IUserProfileRepository {
  save(data: UserProfile): Promise<UserProfile>;
  findByUserId(userId: string): Promise<UserProfile | null>;
  update(id: string, data: UserProfile): Promise<UserProfile>;
  delete(userId: string): Promise<void>;
}
