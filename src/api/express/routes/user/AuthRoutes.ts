import { Request, Response, Router } from 'express';
import {
  authLoginSchema,
  authRegistrationSchema,
} from '../../../../schemas/authSchemas';
import { generateToken } from '../../middlewares/auth/generateToken';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { decodeToken } from '../../middlewares/auth/decodeToken';
import { AuthController } from '../../controllers/user/AuthController';
import { validateData } from '../../middlewares/validateData';

export class AuthRoutes {
  private router: Router;
  private controller: AuthController;

  constructor() {
    this.router = Router();
    this.controller = AuthController.build();
    this.initializeRoutes();
  }

  public static build() {
    return new AuthRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/login/google',
      decodeToken,
      generateToken,
      (req: CustomRequest, res: Response) => {
        this.controller.authUserWithGoole(req, res);
      },
    );

    this.router.post(
      '/register',
      validateData(authRegistrationSchema),
      (req: Request, res: Response) => {
        console.log(req);
        this.controller.registerWithEmailAndPassword(req, res);
      },
    );

    this.router.post(
      '/login',
      validateData(authLoginSchema),
      (req: Request, res: Response) => {
        this.controller.loginWithEmailAndPassword(req, res);
      },
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
