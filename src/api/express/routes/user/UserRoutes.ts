import { Response, Router } from 'express';
import UserController from '../../controllers/user/UserController';
import { decodeToken } from '../../middlewares/auth/decodeToken';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { ensureAuthenticated } from '../../middlewares/auth/ensureAuthenticated';

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
      '/me',
      decodeToken,
      ensureAuthenticated,
      (req: CustomRequest, res: Response) => {
        this.controller.find(req, res);
      },
    );

    this.router.put(
      '/me',
      decodeToken,
      ensureAuthenticated,
      (req: CustomRequest, res: Response) => {
        this.controller.updatePassword(req, res);
      },
    );

    this.router.delete(
      '/me',
      decodeToken,
      ensureAuthenticated,
      (req: CustomRequest, res: Response) => {
        this.controller.delete(req, res);
      },
    );

    this.router.delete(
      '/account',
      decodeToken,
      ensureAuthenticated,
      (req: CustomRequest, res: Response) => {
        this.controller.deleteAccount(req, res);
      },
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
