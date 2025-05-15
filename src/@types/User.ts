export type UserProps = {
  id?: string;
  idProvider?: string | null;
  email: string;
  name: string;
  photoUrl?: string | null;
  provider: string;
  password?: string | null;
};
