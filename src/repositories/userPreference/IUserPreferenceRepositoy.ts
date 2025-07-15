import { UserPreference } from '../../entities/UserPreference';

export interface IUserPreferenceRepository {
  save(data: UserPreference): Promise<UserPreference>;
  find(id: string): Promise<UserPreference | null>;
  findByUserId(userId: string): Promise<UserPreference | null>;
  update(id: string, data: UserPreference): Promise<UserPreference>;
  deleteByUserId(userId: string): Promise<void>;
}
