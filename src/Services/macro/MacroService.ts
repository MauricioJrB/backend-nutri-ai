import { MacroDto } from '../../dtos/MacroDto';
import { Macro } from '../../entities/Macro';
import { IMacroRepository } from '../../interfaces/macro/IMacroRepository';
import { IMacroService } from '../../interfaces/macro/IMacroService';

export class MacroService implements IMacroService {
  private constructor(readonly repository: IMacroRepository) {}

  public static build(repository: IMacroRepository) {
    return new MacroService(repository);
  }

  public async save(data: Macro): Promise<MacroDto> {
    throw new Error('Method not implemented.');
  }
  find(id: string): Promise<MacroDto> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
