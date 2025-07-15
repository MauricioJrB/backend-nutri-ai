import { MacroResponseDto } from '../../dtos/MacroDto';
export interface IMacroService {
  save(userid: string): Promise<MacroResponseDto>;
  findByUserId(userId: string): Promise<MacroResponseDto>;
  deleteByUserId(id: string): Promise<void>;
}
