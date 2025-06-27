import { Response } from 'express';
import { UserPreferenceRepository } from '../../../../repositories/userPreference/UserPreferenceRepository';
import { UserPreferenceService } from '../../../../services/userPreference/UserPreferenceService';
import { prisma } from '../../../../utils/prisma';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import {
  CreateUserPreferenceDto,
  UpdateUserPreferenceDto,
} from '../../../../dtos/UserPreferenceDto';

export class UserPreferenceController {
  constructor(private readonly service: UserPreferenceService) {}

  public static build() {
    const repository = UserPreferenceRepository.build(prisma);
    const service = UserPreferenceService.build(repository);
    return new UserPreferenceController(service);
  }

  public async save(req: CustomRequest, res: Response) {
    try {
      if (!req.user)
        return res
          .status(401)
          .json({ message: 'Unauthorized. No user found in request.' });

      const userId = req.user.id;
      const userPreference: CreateUserPreferenceDto = req.body;

      const data = await this.service.save(userPreference, userId);

      return res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  public async findByUserId(req: CustomRequest, res: Response) {
    try {
      if (!req.user)
        return res
          .status(401)
          .json({ message: 'Unauthorized. No user found in request.' });

      const userId = req.user.id;
      const data = await this.service.findByUserId(userId);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }

  public async update(req: CustomRequest, res: Response) {
    try {
      if (!req.user)
        return res
          .status(401)
          .json({ message: 'Unauthorized. No user found in request.' });

      const userId = req.user.id;
      const userPreference: UpdateUserPreferenceDto = req.body;

      const data = await this.service.update(userId, userPreference);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: CustomRequest, res: Response) {
    try {
      if (!req.user)
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });

      const userId = req.user.id;
      await this.service.delete(userId);
      return res
        .status(200)
        .json({ message: 'User preference deleted successfully.' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
