import bcrypt from 'bcrypt';
import { config } from '../../config';

export const passwordHash = async (password: string) => {
  const salt = bcrypt.genSaltSync(config.saltRounds);
  return bcrypt.hashSync(password, salt);
};
