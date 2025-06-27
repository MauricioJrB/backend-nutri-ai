import { User } from '../../entities/User';

export interface IUserRepository {
  save(user: User): Promise<User>;
  find(id: string): Promise<User | null>;
  findByIdProvider(idProvider: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, password: string): Promise<void>;
  delete(id: string): Promise<void>;
}
