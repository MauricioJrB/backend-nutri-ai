import { Response } from 'express';
import { UserProfileService } from '../../../../services/userProfile/UserProfileService';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';

import { UserProfileRepository } from '../../../../repositories/UserProfileRepository';
import { prisma } from '../../../../utils/prisma';
import {
  CreateUserProfileDto,
  UpdateUserProfileDto,
} from '../../../../dtos/UserProfileDto';

export class UserProfileController {
  constructor(private readonly service: UserProfileService) {}

  public static build() {
    const repository = UserProfileRepository.build(prisma);
    const service = UserProfileService.build(repository);
    return new UserProfileController(service);
  }

  public async save(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const userId = req.user.id;
      const userProfile: CreateUserProfileDto = req.body;

      const data = await this.service.save(userProfile, userId);
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

  public async update(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const userId = req.user.id;
      const userProfile: UpdateUserProfileDto = req.body;

      const data = await this.service.update(userId, userProfile);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
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
      await this.service.delete(userId);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
