import { AppUser, JwtUser } from '../@types/Auth';

export const isAuthUserJwt = (user: AppUser): user is JwtUser => {
  return 'id' in user && 'email' in user;
};
