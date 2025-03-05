export default interface IUser {
  id: string;
  username: string;
  age: number;
  gender: 'Feminino' | 'Masculino';
  height: number;
  weight: number;
  level:
    | 'Sedentario'
    | 'Levemente ativo'
    | 'Moderadamente ativo'
    | 'Muito ativo';
  objective: 'Perder peso' | 'Ganhar musculo' | 'Manutencao';
  trainingFrequency: number;
}
