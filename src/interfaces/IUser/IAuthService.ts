import {
  LoginEmailAndPasswordDto,
  LoginFacebookDto,
  LoginGoogleDto,
  RegisterUserDto,
} from '../../dtos/UserDto';

export interface IAuthService {
  register(
    name: string,
    email: string,
    password: string,
  ): Promise<RegisterUserDto>;
  loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<LoginEmailAndPasswordDto>;
  loginWithGoogle(email: string, token: string): Promise<LoginGoogleDto>;
  loginWithFacebook(email: string, token: string): Promise<LoginFacebookDto>;
}
