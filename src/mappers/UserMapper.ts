import { UserProps } from '../@types/User';
import { CreateUserDto, UserResponseDto } from '../dtos/UserDto';
import { User } from '../entities/User';

export class UserMapper {
  public static toEntity(dto: CreateUserDto): User {
    return User.create({
      id: dto.id || undefined,
      email: dto.email,
      name: dto.name,
      provider: dto.provider || 'email',
      idProvider: dto.idProvider ?? null,
      photoUrl: dto.photoUrl ?? null,
      password: dto.password ?? null,
    });
  }

  public static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      photoUrl: user.photoUrl,
    };
  }

  public static toResponseDtoWithToken(
    user: User,
    token: string,
  ): UserResponseDto & { token: string } {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      photoUrl: user.photoUrl,
      token,
    };
  }

  public static fromPrisma(user: UserProps): User {
    return User.create({
      id: user.id || undefined,
      email: user.email,
      name: user.name,
      provider: user.provider,
      idProvider: user.idProvider,
      photoUrl: user.photoUrl,
      password: user.password,
    });
  }
}
