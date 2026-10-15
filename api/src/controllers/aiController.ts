import { askGroq } from '../services/groqService.js';

export async function chat(req, res) {
  const { question, history } = req.body || {};

  // Validação: pergunta obrigatória e não vazia.
  if (typeof question !== 'string' || question.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'O campo "question" é obrigatório e não pode estar vazio.',
    });
  }

  // Histórico é opcional; se vier, tem de ser array. Caso contrário, usa [].
  const safeHistory = Array.isArray(history) ? history : [];

  try {
    const answer = await askGroq(question.trim(), safeHistory);

    return res.status(200).json({
      success: true,
      data: { answer },
    });
  } catch (error) {
    // Mapeamento de erros da API da Groq para códigos HTTP adequados.
    const status = mapErrorToStatus(error);

    // Log interno para diagnóstico (não expõe a chave nem detalhes sensíveis).
    console.error(`[aiController] Erro (${error.code || 'UNKNOWN'}):`, error.message);

    return res.status(status).json({
      success: false,
      message: buildPublicMessage(error),
    });
  }
}

/**
 * Mapeia o erro para um código HTTP adequado.
 */
function mapErrorToStatus(error: unknown) {
  if (error.status === 401 || error.code === 'MISSING_API_KEY') return 500;
  if (error.status === 429) return 429;
  if (error.status >= 400 && error.status < 500) return 400;
  if (error.status >= 500) return 502;
  return 500;
}

/**
 * Devolve uma mensagem pública sem expor detalhes internos.
 */
function buildPublicMessage(error: unknown) {
  switch (error.code) {
    case 'MISSING_API_KEY':
      return 'Serviço de IA indisponível. Contacte o administrador.';
    case 'NETWORK_ERROR':
      return 'Não foi possível contactar o serviço de IA. Tente novamente.';
    case 'EMPTY_RESPONSE':
      return 'A IA não devolveu uma resposta válida. Tente novamente.';
    case 'GROQ_API_ERROR':
      if (error.status === 401) {
        return 'Falha de autenticação com o serviço de IA.';
      }
      if (error.status === 429) {
        return 'Limite de requisições atingido. Tente novamente mais tarde.';
      }
      return 'Não foi possível processar a pergunta.';
    default:
      return 'Não foi possível processar a pergunta.';
  }
}
