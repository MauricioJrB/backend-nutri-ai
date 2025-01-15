import IUser from '../Interfaces/IUser';

export default class UserDomain implements IUser {
  public id: string;
  public username: string;
  public age: number;
  public gender: 'Feminino' | 'Masculino';
  public height: number;
  public weight: number;
  public level:
    | 'Sedentario'
    | 'Levemente ativo'
    | 'Moderadamente ativo'
    | 'Muito ativo';
  public objective: 'Perder peso' | 'Ganhar musculo' | 'Manutencao';
  public trainingFrequency: number;

  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.age = user.age;
    this.gender = user.gender;
    this.height = user.height;
    this.weight = user.weight;
    this.level = user.level;
    this.objective = user.objective;
    this.trainingFrequency = user.trainingFrequency;
  }
}
