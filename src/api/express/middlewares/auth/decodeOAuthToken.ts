import axios from 'axios';
import { config } from '../../../../../config';
import { CustomRequest } from '../../../../interfaces/express/CustomRequest';
import { Response, NextFunction } from 'express';

export const decodeOAuthToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
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
      console.log('MIDDLEWARE: Token invalido');
      return;
    }

    req.user = {
      idProvider: payload.sub,
      email: payload.email,
      name: payload.name,
      photoUrl: payload.picture,
    };

    next();
  } catch (error) {
    console.error('Error validating Google ID token:', error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};
