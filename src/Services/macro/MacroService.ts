import { MacroResponseDto } from '../../dtos/MacroDto';
import { IMacroRepository } from '../../repositories/macro/IMacroRepository';
import { IMacroService } from './IMacroService';
import { MacroMapper } from '../../mappers/MacroMapper';
import { MacroCalculator } from '../../utils/calculators/MacroCalculator';
import { prisma } from '../../utils/prisma';
import { UserProfileService } from '../userProfile/UserProfileService';
import { UserProfileRepository } from '../../repositories/userProfile/UserProfileRepository';

export class MacroService implements IMacroService {
  private constructor(readonly repository: IMacroRepository) {}

  public static build(repository: IMacroRepository) {
    return new MacroService(repository);
  }

  public async save(userId: string): Promise<MacroResponseDto> {
    const userRepository = UserProfileRepository.build(prisma);
    const userProfileService = UserProfileService.build(userRepository);
    const macroCalculator = new MacroCalculator();

    const userProfile = await userProfileService.findEntityByUserId(userId);

    if (!userProfile) throw new Error('User not found');

    const macroExists = await this.repository.findByUserId(userId);

    if (macroExists) throw new Error('Macro already exists for this user');

    const macro = macroCalculator.calculateMacro(userProfile);
    const savedMacro = await this.repository.save(macro);

    return MacroMapper.toResponseDto(savedMacro);
  }

  public async findByUserId(userId: string): Promise<MacroResponseDto> {
    const macro = await this.repository.findByUserId(userId);
    if (!macro) throw new Error('User not found');

    return MacroMapper.toResponseDto(macro);
  }

  public async delete(userId: string): Promise<void> {
    const macro = await this.repository.findByUserId(userId);

    if (!macro) throw new Error('Macro not found');

    await this.repository.delete(userId);
  }
}
