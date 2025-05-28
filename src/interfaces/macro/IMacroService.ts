import { MacroDto } from '../../dtos/MacroDto';
import { Macro } from '../../entities/Macro';

export interface IMacroService {
  save(data: Macro): Promise<MacroDto>;
  find(id: string): Promise<MacroDto>;
  delete(id: string): Promise<void>;
}
