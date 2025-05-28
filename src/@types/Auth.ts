export type JwtUser = {
  id: string;
  email: string;
  type: 'jwt';
};

export type OAuthUser = {
  id: string;
  idProvider: string;
  email: string;
  name: string;
  photoUrl?: string | null;
  password?: string | null;
  type: 'oauth';
};

export type AppUser = JwtUser | OAuthUser;
