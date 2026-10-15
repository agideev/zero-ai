// Configuração do Express e middlewares.
import express, { type Application, type ErrorRequestHandler } from 'express';

import cors from 'cors';
import aiRoutes from './routes/aiRoutes.js';

const app: Application = express();

// Middleware para parsing de JSON no corpo das requisições.
app.use(express.json());

app.use(cors());

// Rota de saúde simples (útil para verificar se o servidor está ativo).
app.get('/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

// Rotas da IA.
app.use('/api/ai', aiRoutes);

// Middleware para rotas não encontradas.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada.',
  });
});


// Middleware de tratamento de erros.
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('[app] Erro não tratado:', err.message);

  if (err.type === 'entity.parse.failed') {
    res.status(400).json({
      success: false,
      message: 'JSON inválido no corpo da requisição.',
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor.',
  });
};

app.use(errorHandler);


export default app;
