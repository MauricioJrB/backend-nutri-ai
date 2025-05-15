import { Response, Router } from 'express';
import UserController from '../../Controllers/user/UserController';
import { decodeTokenJwt } from '../../middlewares/auth/decodeTokenJwt';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';

export class UserRoutes {
  private router: Router;
  private controller: UserController;

  public static build() {
    return new UserRoutes();
  }

  constructor() {
    this.router = Router();
    this.controller = UserController.build();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get(
      '/:id',
      decodeTokenJwt,
      (req: CustomRequest, res: Response) => {
        this.controller.find(req, res);
      },
    );

    this.router.put(
      '/:id',
      decodeTokenJwt,
      (req: CustomRequest, res: Response) => {
        this.controller.updatePassword(req, res);
      },
    );

    this.router.delete(
      '/:id',
      decodeTokenJwt,
      (req: CustomRequest, res: Response) => {
        this.controller.delete(req, res);
      },
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
