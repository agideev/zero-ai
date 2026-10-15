import { SYSTEM_PROMPT } from './systemPrompt.js';
/**
 * @typedef {Object} ChatMessage
 * @property {'user'|'assistant'} role
 * @property {string} content
 */

/**
 * Recebe a pergunta atual + histórico e devolve o prompt final como string.
 *
 * @param {string} question
 * @param {ChatMessage[]} history
 * @returns {string}
 */
export function buildPrompt(question: string, history = []) {
  const cleanHistory = sanitizeHistory(history);

  const historyBlock =
    cleanHistory.length > 0
      ? cleanHistory
          .map((m) =>
            m.role === 'user'
              ? `Utilizador: ${m.content}`
              : `Assistente: ${m.content}`
          )
          .join('\n')
      : '(sem histórico anterior)';

  return [
    SYSTEM_PROMPT,
    '',
    '---',
    'HISTÓRICO DA CONVERSA:',
    historyBlock,
    '',
    '---',
    'PERGUNTA ATUAL:',
    question,
  ].join('\n');
}

/**
 * Filtra e normaliza o histórico.
 * @param {ChatMessage[]} history
 * @returns {ChatMessage[]}
 */
function sanitizeHistory(history: any[]) {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim() !== ''
    )
    .map((m) => ({
      role: m.role,
      content: m.content.trim(),
    }));
}
