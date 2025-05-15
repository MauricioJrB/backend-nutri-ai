import { defineConfig } from '../defineConfig';

export function createLocalConfig() {
  return defineConfig({
    env: 'local',
    apiURL: process.env.API_URL as string,
    port: Number(process.env.PORT) || 8000,
    databaseURL: process.env.DATABASE_URL as string,
    apiGeminiKey: process.env.API_GEMINI_KEY as string,
    jwtSecret: process.env.JWT_SECRET as string,
    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
    clientId: process.env.CLIENT_ID as string,
    androidClientId: process.env.ANDROID_CLIENT_ID as string,
    webClientId: process.env.WEB_CLIENT_ID as string,
  });
}
