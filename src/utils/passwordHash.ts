import bcrypt from 'bcrypt';
import { config } from '../../config';

export const passwordHash = (password: string) => {
  const salt = bcrypt.genSaltSync(config.saltRounds);
  return bcrypt.hashSync(password, salt);
};
