import { UserResponseDto } from '../../dtos/UserDto';
import { IUserService } from './IUserService';

import bcrypt from 'bcrypt';
import { passwordHash } from '../../utils/auth/passwordHash';
import { UserMapper } from '../../mappers/UserMapper';
import { UserRepository } from '../../repositories/user/UserRepository';

export class UserService implements IUserService {
  private constructor(readonly repository: UserRepository) {}

  public static build(repository: UserRepository) {
    return new UserService(repository);
  }

  public async find(id: string): Promise<UserResponseDto> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('User not found');
    return UserMapper.toResponseDto(user);
  }

  public async findByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('User not found');
    return UserMapper.toResponseDto(user);
  }

  public async update(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.repository.find(id);

    if (!user) throw new Error('User not found');

    if (!user.password) throw new Error('User has no password');

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error('Old password is incorrect');

    const newPasswordEncrypted = await passwordHash(newPassword);

    await this.repository.update(id, newPasswordEncrypted);
  }

  public async delete(id: string): Promise<void> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('User not found');

    await this.repository.delete(id);
  }
}
