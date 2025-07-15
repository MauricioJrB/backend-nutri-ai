import { Macro } from '../../entities/Macro';

export interface IMacroRepository {
  save(data: Macro): Promise<Macro>;
  findByUserId(userId: string): Promise<Macro | null>;
  deleteByUserId(userId: string): Promise<void>;
}
