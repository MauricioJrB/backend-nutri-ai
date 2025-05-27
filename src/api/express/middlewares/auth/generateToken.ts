import jwt from 'jsonwebtoken';
import { config } from '../../../../../config';

import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { Response, NextFunction } from 'express';
import { isOAuthUser } from '../../../../utils/isOAuthUser';

export const generateToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (isOAuthUser(req.user)) {
      const token = jwt.sign(
        {
          userUid: req.user.idProvider,
          name: req.user.name,
          email: req.user.email,
        },
        config.jwtSecret,
      );

      req.token = token;
    }
    return next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
