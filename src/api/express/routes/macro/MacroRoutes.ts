import { Request, Response, Router } from 'express';
import { MacroController } from '../../controllers/macro/MacroController';
import { decodeToken } from '../../middlewares/auth/decodeToken';
import { ensureAuthenticated } from '../../middlewares/auth/ensureAuthenticated';

export class MacroRoutes {
  private router: Router;
  private controller: MacroController;
  constructor() {
    this.router = Router();
    this.controller = MacroController.build();
    this.initializeRoutes();
  }

  public static build() {
    return new MacroRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      decodeToken,
      ensureAuthenticated,
      (req: Request, res: Response) => {
        this.controller.save(req, res);
      },
    );

    this.router.get(
      '/',
      decodeToken,
      ensureAuthenticated,
      (req: Request, res: Response) => {
        this.controller.findByUserId(req, res);
      },
    );

    this.router.delete(
      '/',
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
