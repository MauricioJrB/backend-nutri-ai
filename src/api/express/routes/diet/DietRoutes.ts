import { Request, Response, Router } from 'express';
import { DietController } from '../../controllers/diet/DietController';
import { decodeToken } from '../../middlewares/auth/decodeToken';
import { ensureAuthenticated } from '../../middlewares/auth/ensureAuthenticated';

export class DietRoutes {
  private router: Router;
  private controller: DietController;

  constructor() {
    this.router = Router();
    this.controller = DietController.build();
    this.initializeRoutes();
  }

  public static build() {
    return new DietRoutes();
  }

  private initializeRoutes() {
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
