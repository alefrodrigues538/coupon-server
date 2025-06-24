// src/server.ts
import { App } from './app';
import { env } from './config/environment';

if (process.env.NODE_ENV !== 'production') {
  const appInstance = new App();
  const PORT = env.PORT || 3001;

  try {
    appInstance.listen(PORT);
  } catch (error) {
    console.log(`[Error on development server running]: ${error}`);
  }
}