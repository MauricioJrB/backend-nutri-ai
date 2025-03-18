import { LoginUserDto, RegisterUserDto } from '../../dtos/UserDto';

export interface IAuthService {
  register(
    name: string,
    email: string,
    password: string,
  ): Promise<RegisterUserDto>;
  loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<LoginUserDto>;
  loginWithGoogle(email: string, token: string): Promise<LoginUserDto>;
  loginWithFacebook(email: string, token: string): Promise<LoginUserDto>;
}
