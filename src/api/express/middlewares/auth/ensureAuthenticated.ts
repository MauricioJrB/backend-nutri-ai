import { NextFunction, Response } from 'express';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { isAuthUserJwt } from '../../../../utils/auth/isAuthUserJwt';
import { isOAuthUser } from '../../../../utils/auth/isOAuthUser';

export const ensureAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user || (!isAuthUserJwt(req.user) && !isOAuthUser(req.user))) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }
  next();
};
