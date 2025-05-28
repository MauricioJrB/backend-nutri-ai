export type CreateUserDto = {
  email: string;
  name: string;
  provider?: string | null;
  idProvider?: string | null;
  photoUrl?: string | null;
  password?: string | null;
};

export type UserResponseDto = {
  id?: string;
  email: string;
  name: string;
  photoUrl?: string | null;
};

export type UserLoginResponseDto = {
  token: string;
};

export type UpdateUserPasswordDto = {
  oldPassword: string;
  newPassword: string;
};
