// Service responsável por comunicar com a API da Groq via SDK oficial.

import { Groq } from 'groq-sdk';
import { buildPrompt } from '../prompts/promptBuilder.js';

const GROQ_MODEL = 'qwen/qwen3.8-27b';

let groqClient: Groq | null = null;

function getClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    const error = new Error('GROQ_API_KEY não está configurada.');
    error.status = 500;
    error.code = 'MISSING_API_KEY';
    throw error;
  }

  if (!groqClient) {
    groqClient = new Groq({ apiKey });
  }

  return groqClient;
}

export async function askGroq(question: string, history = []) {
  const client = getClient();
  const prompt = buildPrompt(question, history);

  let completion;

  try {
    completion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: GROQ_MODEL,
      temperature: 0.6,
      max_completion_tokens: 2048,
      top_p: 0.95,
      stream: false,
      reasoning_effort: 'default',
      stop: null,
    });
  } catch (err) {
    console.error('[askGroq] Erro:', err?.message);
    throw normalizeGroqError(err);
  }

  // Debug simples
  // console.log('[askGroq] Question:', question);
  console.log('[askGroq] History:', history);
  console.log('[askGroq] Prompt:', prompt);
  // console.log('[askGroq] Completion:', completion);

  const answer = completion?.choices?.[0]?.message?.content;

  if (typeof answer !== 'string' || answer.trim() === '') {
    const error = new Error('A API da Groq não devolveu texto na resposta.');
    error.status = 502;
    error.code = 'EMPTY_RESPONSE';
    throw error;
  }

  return answer;
}

export async function* askGroqStream(question: string, history = []) {
  const client = getClient();
  const prompt = buildPrompt(question, history);

  let stream;

  try {
    stream = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: GROQ_MODEL,
      temperature: 0.6,
      max_completion_tokens: 2048,
      top_p: 0.95,
      stream: true,
      reasoning_effort: 'default',
      stop: null,
    });
  } catch (err) {
    throw normalizeGroqError(err);
  }

  try {
    for await (const chunk of stream) {
      const delta = chunk?.choices?.[0]?.delta?.content;
      if (typeof delta === 'string' && delta.length > 0) {
        yield delta;
      }
    }
  } catch (err) {
    throw normalizeGroqError(err);
  }
}

function normalizeGroqError(err) {
  const status = err?.status ?? err?.response?.status ?? 502;
  const apiMessage =
    err?.error?.message ||
    err?.response?.data?.error?.message ||
    err?.message ||
    'Erro desconhecido da API da Groq.';

  const error = new Error(apiMessage);
  error.status = status;

  if (status === 401 || status === 429) {
    error.code = 'GROQ_API_ERROR';
  } else if (status >= 500 || !err?.status) {
    error.code = 'NETWORK_ERROR';
  } else {
    error.code = 'GROQ_API_ERROR';
  }

  return error;
}
