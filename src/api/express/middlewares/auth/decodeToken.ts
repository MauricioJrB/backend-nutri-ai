import jwt from 'jsonwebtoken';
import axios from 'axios';
import { config } from '../../../../../config';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { Response, NextFunction } from 'express';

export const decodeToken = async (
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
        type: 'jwt',
      };

      return next();
    }
  } catch (_) {}

  try {
    const idToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!idToken) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const googleResponse = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
    );

    const payload = googleResponse.data;

    const validClientIds = [
      config.clientId,
      config.androidClientId,
      config.webClientId,
    ];

    if (!validClientIds.includes(payload.aud)) {
      res.status(400).json({ error: 'Invalid token: client ID mismatch' });
      return;
    }

    req.user = {
      id: payload.sub,
      idProvider: payload.sub,
      email: payload.email,
      name: payload.name,
      photoUrl: payload.picture,
      type: 'oauth',
    };

    return next();
  } catch (error) {
    console.error('Error validating Google ID token:', error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};
