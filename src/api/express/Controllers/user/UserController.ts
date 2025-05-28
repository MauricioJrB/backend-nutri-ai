import { prisma } from '../../../../utils/prisma';
import { UserService } from '../../../../services/user/UserService';
import { UserRepository } from '../../../../repositories/UserRepository';
import { Response } from 'express';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';

export default class UserController {
  constructor(private readonly service: UserService) {}

  public static build() {
    const repository = UserRepository.build(prisma);
    const service = UserService.build(repository);
    return new UserController(service);
  }

  public async find(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const id = req.user.id;

      const data = await this.service.find(id);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }

  public async updatePassword(req: CustomRequest, res: Response) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }

      const id = req.user.id;
      const { oldPassword, newPassword } = req.body;

      await this.service.update(id, oldPassword, newPassword);

      return res.status(200).json({ message: 'Password updated successfully' });
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

      const id = req.user.id;

      await this.service.delete(id);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ error: error.message });
    }
  }
}
