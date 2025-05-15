import { User } from '../../entities/User';
import { IAuthService } from '../../interfaces/user/IAuthService';
import { UserRepository } from '../../repositories/UserRepository';
import { UserDto, UserResponseDto } from '../../dtos/UserDto';
import { passwordHash } from '../../utils/passwordHash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../../../config';

export class AuthService implements IAuthService {
  private constructor(readonly repository: UserRepository) {}

  public static build(repository: UserRepository) {
    return new AuthService(repository);
  }

  public async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserDto> {
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

    return { token, id: user.id, email: user.email };
  }

  public async registerWithEmailAndPassword(
    name: string,
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const userExists = await this.repository.findByEmail(email);
    if (userExists) throw new Error('User already exists');

    const passwordEncrypted = await passwordHash(password);

    const userObj = User.create(
      email,
      name,
      'email',
      null,
      null,
      passwordEncrypted,
    );

    const newUser = await this.repository.save(userObj);

    return UserDto.userResponse(newUser);
  }

  public async authUserWithGoogle(
    idProvider: string,
    name: string,
    email: string,
    picture: string | null,
  ): Promise<UserResponseDto> {
    const userExists = await this.repository.findByIdProvider(idProvider);

    if (userExists) return UserDto.userResponse(userExists);

    const userObj = User.create(
      idProvider,
      name,
      email,
      'google',
      picture,
      null,
    );

    await this.repository.save(userObj);

    return UserDto.userResponse(userObj);
  }
}
