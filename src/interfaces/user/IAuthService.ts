import { UserDto } from '../../dtos/UserDto';

export interface IAuthService {
  registerWithEmailAndPassword(
    email: string,
    name: string,
    password: string,
  ): Promise<UserDto>;
  loginWithEmailAndPassword(email: string, password: string): Promise<UserDto>;
  authUserWithGoogle(
    idProvider: string,
    email: string,
    name: string,
    photoUrl: string,
    password: string,
  ): Promise<UserDto>;
}
