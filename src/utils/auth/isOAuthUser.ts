import { AppUser, OAuthUser } from '../../@types/Auth';

export const isOAuthUser = (user: AppUser): user is OAuthUser => {
  return 'idProvider' in user && 'name' in user;
};
