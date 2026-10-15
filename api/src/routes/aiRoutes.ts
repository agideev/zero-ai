// src/routes/aiRoutes.ts

// Rotas relacionadas com a IA.
import { Router } from 'express';
import type { Router as RouterType } from 'express';
import { chat } from '../controllers/aiController.js';

const router: RouterType = Router();

// POST /api/ai/chat
router.post('/chat', chat);

export default router;
