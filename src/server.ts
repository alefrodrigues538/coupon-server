// src/server.ts
import { App } from './app';
import { env } from './config/environment'; // Importa as variáveis de ambiente

const appInstance = new App();
const PORT = env.PORT || 3001; // Usa a porta das variáveis de ambiente

appInstance.listen(PORT);