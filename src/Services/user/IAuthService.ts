import { UserLoginResponseDto, UserResponseDto } from '../../dtos/UserDto';

export interface IAuthService {
  registerWithEmailAndPassword(
    email: string,
    name: string,
    password: string,
  ): Promise<UserResponseDto>;
  loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserLoginResponseDto>;
  authUserWithGoogle(
    idProvider: string,
    email: string,
    name: string,
    photoUrl: string,
    password: string,
  ): Promise<UserResponseDto>;
}
