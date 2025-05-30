import cors from 'cors';
import { IApi } from '../../interfaces/express/IApi';
import express, { Express, Router } from 'express';
import { AuthRoutes } from './routes/user/AuthRoutes';
import { UserRoutes } from './routes/user/UserRoutes';
import { errorHandle } from './middlewares/error/errorHandle';
import { UserProfileRoutes } from './routes/userProfile/UserProfileRoutes';
import { MacroRoutes } from './routes/macro/MacroRoutes';

export class ApiExpress implements IApi {
  private protectedRoutes: Router;
  private authRoutes = AuthRoutes.build();
  private userRoutes = UserRoutes.build();
  private userProfileRoutes = UserProfileRoutes.build();
  private macroRoutes = MacroRoutes.build();

  constructor(readonly app: Express) {
    this.protectedRoutes = Router();
    this.routerConfig();
  }

  public static build() {
    const app = express();
    app.use(express.json());
    app.use(
      cors({
        origin: '*',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
      }),
    );
    return new ApiExpress(app);
  }

  private routerConfig(): void {
    this.app.use('/auth', this.authRoutes.getRouter());
    this.protectedRoutes.use('/users', this.userRoutes.getRouter());
    this.protectedRoutes.use('/profile', this.userProfileRoutes.getRouter());
    this.protectedRoutes.use('/macro', this.macroRoutes.getRouter());
    this.app.use('/api', this.protectedRoutes);
    this.app.use(errorHandle);
  }

  public getRoutes(): Router {
    return this.app;
  }

  public start(host: string, port: number): void {
    this.app.listen(port, () =>
      console.log(`Server is running at ${host}:${port}`),
    );
  }
}
