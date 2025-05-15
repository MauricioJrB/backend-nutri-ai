export type JwtUser = {
  id: string;
  email: string;
};

export type OAuthUser = {
  idProvider: string;
  email: string;
  name: string;
  photoUrl?: string | null;
  password?: string | null;
};

export type AppUser = JwtUser | OAuthUser;
