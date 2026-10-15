<template>
  <div ref="scrollEl" class="h-full overflow-y-auto px-5 py-6">

    <!-- Estado vazio: mensagem + composer centrado com sombra grande -->
    <div
      v-if="messages.length === 0"
      class="h-full flex flex-col items-center justify-center"
    >
      <div class="w-full max-w-xl">
        <!-- Mensagem acima do composer -->
        <div class="text-center mb-6">
          <h2 class="text-2xl font-semibold text-ink mb-2">
            Como posso ajudar hoje?
          </h2>
          <p class="text-sm text-ink-soft">
            Faça uma pergunta para começar a conversa.
          </p>
        </div>

        <!-- Composer centrado -->
        <div class="rounded-2xl bg-white shadow-2xl shadow-black/10">
          <ChatComposer
            :disabled="loading"
            :messages="messages"
            @send="handleSendEmply"
          />
        </div>
      </div>
    </div>

    <div v-else ref="listEl" class="flex flex-col gap-4">
      <MessageBubble
        v-for="msg in messages"
        :key="msg.id"
        :role="msg.role"
        :content="msg.content"
        :error="!!msg.error"
        :typing="!!msg.typing"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import MessageBubble from './MessageBubble.vue';
import ChatComposer from './ChatComposer.vue';

const props = defineProps({
  messages: { type: Array, required: true },
  loading: { type: Boolean, default: false },
});

const scrollEl = ref(null);
const listEl = ref(null);

const emit = defineEmits(['send'])

function handleSendEmply(question: string){
  emit('send', question);
}

/**
 * Faz scroll até à última mensagem do chat.
 */
async function goToLastMessage() {
  await nextTick();

  // Estratégia 1: scroll no container até ao fundo (mais simples e fiável).
  if (scrollEl.value) {
    scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
  }

  // Estratégia 2 (opcional): rolar o último filho para a vista.
  // Útil se quiseres garantir que a última mensagem fica visível mesmo
  // quando o container tem margens/paddings grandes.
  if (listEl.value?.lastElementChild) {
    listEl.value.lastElementChild.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }
}

// Sempre que chegam mensagens novas OU o conteúdo muda (typewriter),
// vai para a última mensagem.
watch(
  () => props.messages.map((m) => `${m.id}:${m.content.length}`).join('|'),
  () => goToLastMessage()
);

// Garante posição correta no arranque (se já houver mensagens).
onMounted(() => goToLastMessage());
</script>
