<template>
  <div :class="['flex', role === 'user' ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap break-words',
        role === 'user'
          ? 'bg-ink text-white rounded-br-md'
          : 'bg-surface-soft text-ink rounded-bl-md',
        error ? 'bg-red-50 text-red-600 border border-red-200' : '',
      ]"
    >
      <!-- Indicador de digitação -->
      <span v-if="typing" class="inline-flex items-center gap-1 h-[18px]">
        <span class="w-1.5 h-1.5 rounded-full bg-ink-soft animate-blink"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-ink-soft animate-blink [animation-delay:0.2s]"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-ink-soft animate-blink [animation-delay:0.4s]"></span>
      </span>

      <span v-else>{{ content }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  role: { type: String, required: true }, // 'user' | 'assistant'
  content: { type: String, default: '' },
  error: { type: Boolean, default: false },
  typing: { type: Boolean, default: false },
});
</script>

<style scoped>
/* Animação do indicador de digitação (Tailwind v4 não traz "blink") */
@keyframes blink {
  0%, 80%, 100% { opacity: 0.3; }
  40% { opacity: 1; }
}

.animate-blink {
  animation: blink 1.2s infinite ease-in-out;
}
</style>
