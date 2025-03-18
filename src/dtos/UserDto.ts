export type RegisterUserDto = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export type LoginUserDto = {
  id?: string;
  email: string;
  token: string;
};

export type FindUserDto = {
  id?: string;
  name: string;
  email: string;
  password: string;
};
