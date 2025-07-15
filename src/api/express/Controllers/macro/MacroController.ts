import { prisma } from '../../../../utils/prisma';
import { Response } from 'express';
import { MacroService } from '../../../../services/macro/MacroService';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { MacroRepository } from '../../../../repositories/macro/MacroRepository';

export class MacroController {
  constructor(private readonly service: MacroService) {}

  public static build() {
    const repository = MacroRepository.build(prisma);
    const service = MacroService.build(repository);
    return new MacroController(service);
  }

  public async save(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const userId = req.user.id;
      const data = await this.service.save(userId);

      return res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  public async findByUserId(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }
      const userId = req.user.id;

      const data = await this.service.findByUserId(userId);
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }

  public async delete(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }
      const userId = req.user.id;
      await this.service.deleteByUserId(userId);
      return res.status(200).json({ message: 'Macro deleted successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
