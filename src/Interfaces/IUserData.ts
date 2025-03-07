import mongoose from 'mongoose';

export default interface IUserData {
  userId: mongoose.Types.ObjectId;
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
