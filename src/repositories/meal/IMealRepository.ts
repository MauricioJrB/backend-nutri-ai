import { Meal } from '../../entities/Meal';

export interface IMealRepository {
  save(data: Meal): Promise<Meal>;
  find(id: string): Promise<Meal | null>;
  findByUserId(userId: string): Promise<Meal[]>;
  findByDietId(dietId: string): Promise<Meal[]>;
  update(id: string, data: Meal): Promise<Meal>;
  deleteByUserId(userId: string): Promise<void>;
}
