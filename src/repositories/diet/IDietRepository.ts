import { Diet } from '../../entities/Diet';

export interface IDietRepository {
  save(data: Diet): Promise<Diet>;
  find(id: string): Promise<Diet | null>;
  findByUserId(userId: string): Promise<Diet | null>;
  update(id: string, data: Diet): Promise<Diet>;
  delete(id: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
