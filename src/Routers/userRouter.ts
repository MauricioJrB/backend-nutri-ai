import { Request, Response, Router } from 'express';
import UserController from '../Controllers/UserController';

const router = Router();

router.post('/signin', (req: Request, res: Response) => {
  new UserController(req, res).login();
});

router.post('/signup', (req: Request, res: Response) => {
  new UserController(req, res).signUp();
});

router.get('/user/:id', (req: Request, res: Response) => {
  new UserController(req, res).getUser();
});

router.put('/user/:id', (req, res) => {
  new UserController(req, res).updatePassword();
});

router.delete('/user/:id', (req, res) => {
  new UserController(req, res).deleteUser();
});

export default router;
