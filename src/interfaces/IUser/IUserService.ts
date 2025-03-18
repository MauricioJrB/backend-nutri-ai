import { FindUserDto } from '../../dtos/UserDto';

export interface IUserService {
  find(id: string): Promise<FindUserDto>;
  findByEmail(id: string): Promise<FindUserDto>;
  update(id: string, password: string): Promise<void>;
  delete(id: string): Promise<void>;
}
