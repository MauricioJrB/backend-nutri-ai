import { User } from '../entities/User';

export type UserResponseDto = {
  id?: string;
  email: string;
  name: string;
  photoUrl?: string | null;
};

export class UserDto {
  public static userResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      photoUrl: user.photoUrl,
    };
  }
}
