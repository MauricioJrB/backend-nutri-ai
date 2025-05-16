import { UserProps } from '../@types/User';

export class User {
  private constructor(readonly props: UserProps) {}

  public static create(
    email: string,
    name: string,
    provider: string,
    idProvider?: string | null,
    photoUrl?: string | null,
    password?: string | null,
  ) {
    return new User({
      email,
      name,
      provider,
      idProvider: idProvider || null,
      photoUrl: photoUrl || null,
      password: password || null,
    });
  }

  public static load(
    id: string,
    email: string,
    name: string,
    provider: string,
    idProvider?: string | null,
    photoUrl?: string | null,
    password?: string | null,
  ) {
    return new User({
      id,
      idProvider,
      email,
      name,
      provider,
      photoUrl,
      password,
    });
  }

  public get id(): string | undefined {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get idProvider(): string | null {
    return this.props.idProvider || null;
  }

  public get provider(): string {
    return this.props.provider;
  }

  public get photoUrl(): string | null {
    return this.props.photoUrl || null;
  }

  public get password(): string | null {
    return this.props.password || null;
  }
}
