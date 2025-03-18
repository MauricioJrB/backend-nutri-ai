import { FindUserDto } from '../dtos/UserDto';
import { IUserService } from '../interfaces/IUser/IUserService';
import { UserRepository } from '../repositories/UserRepository';

export class UserService implements IUserService {
  private constructor(readonly repository: UserRepository) {}

  public static build(repository: UserRepository) {
    return new UserService(repository);
  }

  public async find(id: string): Promise<FindUserDto> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('User not found');

    const output: FindUserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    return output;
  }

  public async findByEmail(email: string): Promise<FindUserDto> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const output: FindUserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    return output;
  }

  public async update(id: string, password: string): Promise<void> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('User not found');

    user.changePassword(password);
    await this.repository.update(id, password);
  }

  public async delete(id: string): Promise<void> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('User not found');

    await this.repository.delete(id);
  }
}
