import { CreateUserDto, UserResponseDto } from '../dtos/UserDto';
import { User } from '../entities/User';

export class UserMapper {
  public static toEntity(dto: CreateUserDto): User {
    return User.create(
      dto.email,
      dto.name,
      dto.provider ?? 'email',
      dto.idProvider ?? null,
      dto.photoUrl ?? null,
      dto.password ?? null,
    );
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
}
