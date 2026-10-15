<template>
  <div class="flex flex-col h-full max-w-3xl mx-auto bg-surface">
    <!-- Cabeçalho -->
    <header
      class="flex items-center justify-between px-5 py-4 border-b border-line"
    >
      <div class="flex items-center gap-3">
        <AppLogo :size="110" />
      </div>

      <button
        type="button"
        class="text-xs px-3 py-1.5 rounded-lg border border-line text-ink-soft
               hover:bg-surface-soft hover:text-ink transition
               disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="messages.length === 0 || loading"
        @click="clearChat"
      >
        Limpar
      </button>
    </header>

    <!-- Janela de chat -->
    <main class="flex-1 overflow-hidden">
      <ChatWindow @send="handleSend" :messages="messages" :loading="loading" />
    </main>

    <!-- Composer -->
    <footer class="px-5 pb-5 pt-3">

      <ChatComposer
      v-if="messages.length > 0"
      :disabled="loading" :messages="messages" @send="handleSend" />
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatWindow from '../components/chat/ChatWindow.vue';
import ChatComposer from '../components/chat/ChatComposer.vue';
import AppLogo from '../components/chat/AppLogo.vue';
import { sendMessage } from '../services/api.js';

const messages = ref([]);
const loading = ref(false);

const history = [];

let nextId = 1;

const TYPE_SPEED_MS = 7;

/**
 * Efeito de digitação. Muta `messageRef.content` (que deve ser reativo).
 */
function typeWriter(messageRef, fullText) {
  return new Promise((resolve) => {
    let i = 0;

    const tick = () => {
      if (i >= fullText.length) {
        messageRef.content = fullText;
        resolve();
        return;
      }

      messageRef.content += fullText.slice(i, i + 1);
      i += 1;

      setTimeout(tick, TYPE_SPEED_MS);
    };

    tick();
  });
}

async function handleSend(question) {
  if (!question || loading.value) return;

  // 1) Mensagem do utilizador
  messages.value.push({
    id: nextId++,
    role: 'user',
    content: question,
  });

  history.push({ role: 'user', content: question });

  loading.value = true;

  // 2) Placeholder do assistant
  messages.value.push({
    id: nextId++,
    role: 'assistant',
    content: '',
    typing: true,
  });

  // ✅ IMPORTANTE: obter a referência REATIVA de dentro do array
  const assistantMessage = messages.value[messages.value.length - 1];

  try {
    const answer = await sendMessage(question, history);

    // 3) Desliga o "a pensar..." e começa a escrever
    assistantMessage.typing = false;
    loading.value = false;
    await typeWriter(assistantMessage, answer);

    // 4) Histórico (usa o texto final)
    history.push({ role: 'assistant', content: answer });
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      'Erro ao contactar o servidor.';

    assistantMessage.content = message;
    assistantMessage.error = true;
    assistantMessage.typing = false;
  } finally {
    loading.value = false;
  }
}

function clearChat() {
  messages.value = [];
  history.length = 0;
}
</script>
