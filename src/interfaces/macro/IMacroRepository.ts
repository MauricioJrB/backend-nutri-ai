import { Macro } from '../../entities/Macro';

export interface IMacroRepository {
  save(data: Macro): Promise<Macro>;
  find(id: string): Promise<Macro | null>;
  delete(id: string): Promise<void>;
}
