import { Request, Response, Router } from 'express';
import { UserPreferenceController } from '../../controllers/userPreference/UserPreferenceController';
import { decodeToken } from '../../middlewares/auth/decodeToken';
import { ensureAuthenticated } from '../../middlewares/auth/ensureAuthenticated';
import { validateData } from '../../middlewares/validateData';
import { userPreferenceSchemas } from '../../../../schemas/userPreferenceSchemas';

export class UserPreferenceRoutes {
  private router: Router;
  private constroller: UserPreferenceController;

  constructor() {
    this.router = Router();
    this.constroller = UserPreferenceController.build();
    this.initializeRoutes();
  }

  public static build() {
    return new UserPreferenceRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      decodeToken,
      ensureAuthenticated,
      validateData(userPreferenceSchemas),
      (req: Request, res: Response) => {
        this.constroller.save(req, res);
      },
    );

    this.router.get(
      '/',
      decodeToken,
      ensureAuthenticated,
      (req: Request, res: Response) => {
        this.constroller.findByUserId(req, res);
      },
    );

    this.router.put(
      '/',
      decodeToken,
      ensureAuthenticated,
      validateData(userPreferenceSchemas),
      (req: Request, res: Response) => {
        this.constroller.update(req, res);
      },
    );

    this.router.delete(
      '/',
      decodeToken,
      ensureAuthenticated,
      (req: Request, res: Response) => {
        this.constroller.delete(req, res);
      },
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
