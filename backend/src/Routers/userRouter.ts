import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../Controllers/UserController';

const router = Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  new UserController(req, res, next).create();
});

router.get('/users', (req: Request, res: Response, next: NextFunction) => {
  new UserController(req, res, next).getAllUsers();
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  new UserController(req, res, next).getUserById();
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  new UserController(req, res, next).updateUserById();
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  new UserController(req, res, next).deleteUserById();
});

export default router;
