import { NextFunction, Request, Response, Router } from 'express';
import UserMacroController from '../Controllers/UserMacroController';

const router = Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  new UserMacroController(req, res, next).create();
});

router.get('/users', (req: Request, res: Response, next: NextFunction) => {
  new UserMacroController(req, res, next).getAllUsers();
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  new UserMacroController(req, res, next).getUserById();
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  new UserMacroController(req, res, next).updateUserById();
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  new UserMacroController(req, res, next).deleteUserById();
});

export default router;
