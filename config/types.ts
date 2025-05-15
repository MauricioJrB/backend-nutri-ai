import { z } from 'zod';

export const appConfigSchema = z.object({
  env: z.enum(['local', 'staging', 'production']),
  apiURL: z.string().url(),
  port: z.coerce.number().default(8000),
  databaseURL: z.string(),
  apiGeminiKey: z.string(),
  jwtSecret: z.string(),
  saltRounds: z.coerce.number().default(10),
  mocksEnabled: z.boolean().default(false),
  clientId: z.string(),
  androidClientId: z.string(),
  webClientId: z.string(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
export type RequiredConfig = Optional<AppConfig, KeysWithFallbackValue>;

type KeysWithFallbackValue = 'mocksEnabled';
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
