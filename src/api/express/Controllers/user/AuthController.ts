import { prisma } from '../../../../utils/prisma';
import { Request, Response } from 'express';

import { UserRepository } from '../../../../repositories/UserRepository';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { isOAuthUser } from '../../../../utils/isOAuthUser';
import { AuthService } from '../../../../services/user/AuthService';

export class AuthController {
  private constructor() {}

  public static build() {
    return new AuthController();
  }

  public async authUserWithGoole(req: CustomRequest, res: Response) {
    try {
      if (!req.user || !isOAuthUser(req.user)) {
        return res
          .status(401)
          .json({ error: 'Unauthorized. No user found in request.' });
      }
      const { idProvider, email, name, photoUrl } = req.user;
      const token = req.token;

      const repository = UserRepository.build(prisma);
      const service = AuthService.build(repository);

      const user = await service.authUserWithGoogle(
        idProvider,
        email,
        name,
        photoUrl || null,
      );
      const data = {
        ...user,
        token,
      };
      return res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  public async registerWithEmailAndPassword(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const repository = UserRepository.build(prisma);
      const service = AuthService.build(repository);

      const user = await service.registerWithEmailAndPassword(
        name,
        email,
        password,
      );
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  public async loginWithEmailAndPassword(req: CustomRequest, res: Response) {
    try {
      const { email, password } = req.body;

      const repository = UserRepository.build(prisma);
      const service = AuthService.build(repository);
      const user = await service.loginWithEmailAndPassword(email, password);

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
