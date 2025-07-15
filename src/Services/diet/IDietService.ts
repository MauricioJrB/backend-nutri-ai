import { DietResponseDto } from '../../dtos/DietDto';

export interface IDietService {
  save(userId: string): Promise<DietResponseDto>;
  findByUserId(userId: string): Promise<DietResponseDto | null>;
  deleteByUserId(userId: string): Promise<void>;
}
