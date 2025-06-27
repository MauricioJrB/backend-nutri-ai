import { prisma } from '../../../../utils/prisma';
import { AuthService } from '../../../../services/user/AuthService';
import { isOAuthUser } from '../../../../utils/auth/isOAuthUser';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { UserRepository } from '../../../../repositories/user/UserRepository';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private readonly service: AuthService) {}

  public static build() {
    const repository = UserRepository.build(prisma);
    const service = AuthService.build(repository);
    return new AuthController(service);
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

      const user = await this.service.authUserWithGoogle(
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

      const user = await this.service.registerWithEmailAndPassword(
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

      const user = await this.service.loginWithEmailAndPassword(
        email,
        password,
      );

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
