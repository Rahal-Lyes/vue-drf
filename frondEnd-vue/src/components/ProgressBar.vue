<!-- src/components/ProgressBar.vue -->
<template>
  <transition name="fade">
    <div class="has-text-centered mt-5" v-if="visible">
      <progress class="progress is-small is-primary" max="100">Chargement…</progress>
    </div>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  visible: Boolean,
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
