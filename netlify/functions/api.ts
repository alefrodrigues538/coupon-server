// netlify/functions/api.ts
import { Handler } from '@netlify/functions'; // npm install @netlify/functions
import serverless from 'serverless-http'; // npm install serverless-http

// Certifique-se que o dotenv.config() é chamado para carregar variáveis de ambiente
// ou a Netlify já injeta as variáveis no ambiente da função
import dotenv from 'dotenv';
dotenv.config();

// Importa a instância do seu aplicativo Express do src/app.ts
import { App as app } from '../../src/app'; // Ajuste o caminho se necessário

// Crie o handler serverless a partir do seu aplicativo Express
// Isso "envelopa" seu app Express para ser executado como uma função Lambda
const handler: Handler = serverless(app) as unknown as Handler;

// Exporte o handler
export { handler };

