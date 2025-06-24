// src/server.ts (ideal para Vercel)
import { appInstance } from './app';
import { env } from './config/environment';

const PORT = env.PORT || 3000;
appInstance.listen(PORT);