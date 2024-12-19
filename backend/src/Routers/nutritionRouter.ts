import { NextFunction, Request, Response, Router } from 'express';
import NutritionController from '../Controllers/NutritionController';

const router = Router();

router.post(
  '/create/:id',
  (req: Request, res: Response, next: NextFunction) => {
    new NutritionController(req, res, next).create();
  },
);

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  new NutritionController(req, res, next).getNutritionById();
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  new NutritionController(req, res, next).deleteNutritionById();
});

export default router;
