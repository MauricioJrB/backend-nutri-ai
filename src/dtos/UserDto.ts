export type RegisterUserDto = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export type LoginEmailAndPasswordDto = {
  id?: string;
  email: string;
  token: string;
};

export type LoginGoogleDto = {
  token: string;
};

export type LoginFacebookDto = {
  token: string;
};

export type FindUserDto = {
  id?: string;
  name: string;
  email: string;
  password: string;
};
