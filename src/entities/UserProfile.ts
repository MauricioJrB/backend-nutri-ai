import { UserProfileProps } from '../@types/UserProfile';

export class UserProfile {
  private constructor(readonly props: UserProfileProps) {}

  public static create(props: UserProfileProps) {
    return new UserProfile(props);
  }

  public get id(): string | null {
    return this.props.id || null;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get age(): number {
    return this.props.age;
  }

  public get gender(): string {
    return this.props.gender;
  }

  public get height(): number {
    return this.props.height;
  }

  public get weight(): number {
    return this.props.weight;
  }

  public get activityLevel(): string {
    return this.props.activityLevel;
  }

  public get objective(): string {
    return this.props.objective;
  }

  public get activityFrequency(): string {
    return this.props.activityFrequency;
  }
}
