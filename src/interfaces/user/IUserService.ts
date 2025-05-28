import { UserResponseDto } from '../../dtos/UserDto';
export interface IUserService {
  find(id: string): Promise<UserResponseDto>;
  findByEmail(id: string): Promise<UserResponseDto>;
  update(id: string, oldPassword: string, newPassword: string): Promise<void>;
  delete(id: string): Promise<void>;
}
