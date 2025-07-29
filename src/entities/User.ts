import { UserProps } from '../@types/User';

export class User {
  private constructor(readonly props: UserProps) {}

  public static create(props: UserProps) {
    return new User(props);
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
