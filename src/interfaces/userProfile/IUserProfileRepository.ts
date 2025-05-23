import { UserProfileProps } from '../../@types/UserProfile';
import { UserProfile } from '../../entities/UserProfile';

export interface IUserProfileRepository {
  save(data: UserProfile): Promise<UserProfile>;
  find(id: string): Promise<UserProfile | null>;
  findByUserId(userId: string): Promise<UserProfile | null>;
  update(data: Partial<UserProfileProps>): Promise<UserProfile>;
  delete(id: string): Promise<void>;
}
