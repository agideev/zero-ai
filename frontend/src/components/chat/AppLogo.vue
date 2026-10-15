<template>
  <img
    :src="src"
    :width="size"
    :height="size"
    :alt="alt"
    class="object-contain select-none"
    draggable="false"
  />
</template>

<script setup>
defineProps({
  src: { type: String, default: '/logo.png' },
  size: { type: [Number, String], default: 32 },
  alt: { type: String, default: 'AI Chat' },
});
</script>
