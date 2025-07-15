import { Request, Response, Router } from 'express';
import { UserProfileController } from '../../controllers/userProfile/UserProfileController';
import { decodeToken } from '../../middlewares/auth/decodeToken';
import { ensureAuthenticated } from '../../middlewares/auth/ensureAuthenticated';
import { validateData } from '../../middlewares/validateData';
import { userProfileSchemas } from '../../../../schemas/userProfileSchemas';

export class UserProfileRoutes {
  private router: Router;
  private controller: UserProfileController;

  constructor() {
    this.router = Router();
    this.controller = UserProfileController.build();
    this.initializeRoutes();
  }

  public static build() {
    return new UserProfileRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/me',
      validateData(userProfileSchemas),
      decodeToken,
      ensureAuthenticated,
      (req: Request, res: Response) => {
        this.controller.save(req, res);
      },
    );

    this.router.get(
      '/me',
      decodeToken,
      ensureAuthenticated,
      (req: Request, res: Response) => {
        this.controller.findByUserId(req, res);
      },
    );

    this.router.put(
      '/me',
      validateData(userProfileSchemas),
      decodeToken,
      ensureAuthenticated,
      (req: Request, res: Response) => {
        this.controller.update(req, res);
      },
    );

    this.router.delete(
      '/me',
      decodeToken,
      ensureAuthenticated,
      (req: Request, res: Response) => {
        this.controller.delete(req, res);
      },
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
