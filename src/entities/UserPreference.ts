import { DietType } from '@prisma/client';
import { UserPreferenceProps } from '../@types/UserPreference';

export class UserPreference {
  private constructor(readonly props: UserPreferenceProps) {}

  public static create(props: UserPreferenceProps) {
    return new UserPreference(props);
  }

  public get id(): string | null {
    return this.props.id || null;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get userWantsSuplements(): string {
    return this.props.userWantsSuplements;
  }

  public get userAlreadyUses(): string {
    return this.props.userAlreadyUses;
  }

  public get sheduleTrainingStart(): string {
    return this.props.sheduleTrainingStart;
  }

  public get sheduleTrainingEnd(): string {
    return this.props.sheduleTrainingEnd;
  }

  public get userHasScale(): string {
    return this.props.userHasScale;
  }

  public get dietType(): DietType {
    return this.props.dietType;
  }

  public get foodRestrictions(): string {
    return this.props.foodRestrictions;
  }

  public get customSuggestionFood(): string {
    return this.props.customSuggestionFood;
  }
}
