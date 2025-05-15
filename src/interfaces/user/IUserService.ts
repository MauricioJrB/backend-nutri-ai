import { UserResponseDto } from '../../dtos/UserDto';
import { User } from '../../entities/User';

export interface IUserService {
  find(id: string): Promise<UserResponseDto>;
  findByEmail(id: string): Promise<User>;
  update(id: string, oldPassword: string, newPassword: string): Promise<void>;
  delete(id: string): Promise<void>;
}
