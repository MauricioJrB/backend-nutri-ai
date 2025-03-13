export type RegisterUserDto = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type FindUserDto = {
  id?: string;
  name: string;
  email: string;
  password: string;
};
