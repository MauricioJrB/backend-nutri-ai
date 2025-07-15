import { IAuthService } from './IAuthService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../../../config';
import { IUserRepository } from '../../repositories/user/IUserRepository';
import { passwordHash } from '../../utils/auth/passwordHash';
import { UserMapper } from '../../mappers/UserMapper';
import { UserLoginResponseDto, UserResponseDto } from '../../dtos/UserDto';

export class AuthService implements IAuthService {
  private constructor(readonly repository: IUserRepository) {}

  public static build(repository: IUserRepository) {
    return new AuthService(repository);
  }

  public async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserLoginResponseDto> {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const passwordUser = user.password;
    if (!passwordUser) throw new Error('Password not set for this user');

    const passwordMatch = await bcrypt.compare(password, passwordUser);
    if (!passwordMatch) throw new Error('Invalid credentials');

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, config.jwtSecret);

    return UserMapper.toResponseDtoWithToken(user, token);
  }

  public async registerWithEmailAndPassword(
    name: string,
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const userExists = await this.repository.findByEmail(email);
    if (userExists) throw new Error('User already exists');

    const passwordEncrypted = await passwordHash(password);

    const user = UserMapper.toEntity({
      email,
      name,
      provider: 'email',
      idProvider: null,
      photoUrl: null,
      password: passwordEncrypted,
    });

    const savedUser = await this.repository.save(user);

    return UserMapper.toResponseDto(savedUser);
  }

  public async authUserWithGoogle(
    idProvider: string,
    name: string,
    email: string,
    picture: string | null,
  ): Promise<UserResponseDto> {
    const userExists = await this.repository.findByIdProvider(idProvider);

    if (userExists) return UserMapper.toResponseDto(userExists);

    const userExistsByEmail = await this.repository.findByEmail(email);

    if (userExistsByEmail) return UserMapper.toResponseDto(userExistsByEmail);

    const user = UserMapper.toEntity({
      email,
      name,
      provider: 'google',
      idProvider: idProvider,
      photoUrl: picture,
      password: null,
    });

    const savedUser = await this.repository.save(user);

    return UserMapper.toResponseDto(savedUser);
  }
}
