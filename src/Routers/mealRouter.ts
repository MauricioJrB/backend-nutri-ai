import { NextFunction, Request, Response, Router } from 'express';
import MealController from '../Controllers/MealController';

const router = Router();

router.post('/:id', (req: Request, res: Response, next: NextFunction) => {
  new MealController(req, res, next).create();
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  new MealController(req, res, next).getMealById();
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  new MealController(req, res, next).deleteMealByUserId();
});

export default router;
