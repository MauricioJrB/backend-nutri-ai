import { prisma } from '../../../../utils/prisma';
import { UserService } from '../../../../services/user/UserService';

import { UserRepository } from '../../../../repositories/UserRepository';
import { Request, Response } from 'express';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';

export default class UserController {
  private constructor() {}

  public static build() {
    return new UserController();
  }

  public async find(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;

      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const repository = UserRepository.build(prisma);
      const service = UserService.build(repository);

      const output = await service.find(id);
      const data = {
        id: output.id,
        name: output.name,
        email: output.email,
      };
      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }

  public async updatePassword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      const repository = UserRepository.build(prisma);
      const service = UserService.build(repository);

      await service.update(id, oldPassword, newPassword);

      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = UserRepository.build(prisma);
      const service = UserService.build(repository);

      await service.delete(id);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }
}
