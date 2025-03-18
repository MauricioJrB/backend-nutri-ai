import dotenv from 'dotenv';
dotenv.config();

import { createLocalConfig } from './envs/local';
import { createProductionConfig } from './envs/production';

const ENV = process.env.NODE_ENV || 'local';

export const config =
  ENV === 'production' ? createProductionConfig() : createLocalConfig();
