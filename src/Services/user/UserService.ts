import { UserResponseDto } from '../../dtos/UserDto';
import { IUserService } from './IUserService';
import bcrypt from 'bcrypt';
import { passwordHash } from '../../utils/auth/passwordHash';
import { UserMapper } from '../../mappers/UserMapper';
import { UserRepository } from '../../repositories/user/UserRepository';
import { IUserProfileRepository } from '../../repositories/userProfile/IUserProfileRepository';
import { IUserPreferenceRepository } from '../../repositories/userPreference/IUserPreferenceRepositoy';
import { IMacroRepository } from '../../repositories/macro/IMacroRepository';
import { IDietRepository } from '../../repositories/diet/IDietRepository';
import { IMealRepository } from '../../repositories/meal/IMealRepository';
import { IFoodItemRepository } from '../../repositories/foodItem/IFoodItemRepository';

export class UserService implements IUserService {
  private constructor(
    private readonly repository: UserRepository,
    private readonly userProfileRepository: IUserProfileRepository,
    private readonly userPreferenceRepository: IUserPreferenceRepository,
    private readonly userMacroRepository: IMacroRepository,
    private readonly dietRepository: IDietRepository,
    private readonly mealRepository: IMealRepository,
    private readonly foodItemRepository: IFoodItemRepository,
  ) {}

  public static build(
    repository: UserRepository,
    userProfileRepository: IUserProfileRepository,
    userPreferenceRepository: IUserPreferenceRepository,
    userMacroRepository: IMacroRepository,
    dietRepository: IDietRepository,
    mealRepository: IMealRepository,
    foodItemRepository: IFoodItemRepository,
  ) {
    return new UserService(
      repository,
      userProfileRepository,
      userPreferenceRepository,
      userMacroRepository,
      dietRepository,
      mealRepository,
      foodItemRepository,
    );
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

  public async deleteAccount(id: string): Promise<void> {
    const user = await this.repository.find(id);
    if (!user) throw new Error('User not found');

    await this.userProfileRepository.deleteByUserId(id);
    await this.userPreferenceRepository.deleteByUserId(id);
    await this.userMacroRepository.deleteByUserId(id);
    await this.foodItemRepository.deleteByUserId(id);
    await this.mealRepository.deleteByUserId(id);
    await this.dietRepository.deleteByUserId(id);
    await this.repository.delete(id);
  }
}
