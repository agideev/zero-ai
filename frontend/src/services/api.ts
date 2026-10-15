import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

/**
 * Envia pergunta + histórico para o backend.
 * @param {string} question
 * @param {Array<{role: 'user'|'assistant', content: string}>} history
 * @returns {Promise<string>}
 */
export async function sendMessage(question: string, history = []) {
  const response = await api.post('/ai/chat', {
    question,
    history,
  });

  return response.data?.data?.answer ?? '';
}
