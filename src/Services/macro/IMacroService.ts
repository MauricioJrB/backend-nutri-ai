import { MacroResponseDto } from '../../dtos/MacroDto';
export interface IMacroService {
  save(userid: string): Promise<MacroResponseDto>;
  findByUserId(userId: string): Promise<MacroResponseDto>;
  delete(id: string): Promise<void>;
}
