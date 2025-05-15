import jwt from 'jsonwebtoken';
import { config } from '../../../../../config';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { Response, NextFunction } from 'express';

export const decodeTokenJwt = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };

      next();
    } else {
      res.status(401).json({ error: 'Invalid token payload.' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
