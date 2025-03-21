import { UserProps } from '../@types/UserTypes';

export class User {
  private constructor(readonly props: UserProps) {}

  public static create(name: string, email: string, password: string) {
    return new User({
      name,
      email,
      password,
    });
  }

  public static load(
    id: string,
    name: string,
    email: string,
    password: string,
  ) {
    return new User({
      id,
      name,
      email,
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

  public get password(): string {
    return this.props.password;
  }

  public changePassword(newPassword: string): void {
    this.props.password = newPassword;
  }
}
