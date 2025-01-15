import { NextFunction, Request, Response, Router } from 'express';
import MacronutrientsController from '../Controllers/MacronutrientsController';

const router = Router();

router.post(
  '/create/:id',
  (req: Request, res: Response, next: NextFunction) => {
    new MacronutrientsController(req, res, next).create();
  },
);

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  new MacronutrientsController(req, res, next).deleteMacronutrientsById();
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  new MacronutrientsController(req, res, next).deleteMacronutrientsById();
});

export default router;
