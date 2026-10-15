<template>

    <form
      class="relative flex items-end gap-2 rounded-full border border-line
             pl-3.5 pr-2 py-2 bg-white transition
             focus-within:border-gray-300 focus-within:ring-4
             focus-within:ring-ink/5
             before:pointer-events-none before:absolute
             before:bottom-full before:left-0 before:right-0
             before:h-12 before:bg-gradient-to-t
             before:from-white before:to-transparent"
      @submit.prevent="submit"
    >

    <textarea
      ref="textareaEl"
      v-model="text"
      rows="1"
      placeholder="Escreva a sua pergunta..."
      :disabled="disabled"
      class="flex-1 resize-none outline-none border-none bg-transparent
             text-[15px] leading-relaxed text-ink placeholder:text-ink-soft
             max-h-40 py-2 disabled:opacity-60"
      @keydown.enter.exact.prevent="submit"
      @input="autoResize"
    ></textarea>

    <button
      type="submit"
      class="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full
             bg-ink text-white transition hover:opacity-90 active:scale-95
             disabled:opacity-35 disabled:cursor-not-allowed"
      :disabled="disabled || text.trim() === ''"
      aria-label="Enviar"
    >
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  </form>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const props = defineProps({
  disabled: { type: Boolean, default: false },
  messages: { type: Array, required: true },
});

const emit = defineEmits(['send']);

const text = ref('');
const textareaEl = ref(null);

function submit() {
  const value = text.value.trim();
  if (!value || props.disabled) return;

  emit('send', value);
  text.value = '';

  nextTick(() => {
    autoResize();
    textareaEl.value?.focus();
  });
}

function autoResize() {
  const el = textareaEl.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}
</script>
