<template>
  <div
    v-if="show"
    class="notification"
    :class="bulmaColor"
    style="position: fixed; bottom: 1rem; right: 1rem; z-index: 9999; min-width: 350px;"
  >
 <button class="delete" @click="hide" 
 style="position:absolute;top :0rem;right:0rem;"></button>
    <span v-if="icon" class="icon" style="margin-right: 10px">
      <i :class="`fa ${icon}`"></i>
    
    </span>
    {{ message }}
  </div>
</template>

<script setup>
import {  defineProps, computed,defineEmits,watchEffect } from 'vue';

// Props
const props = defineProps({
  message: String,
  color: {
    type: String,
  },
  icon: String,
  duration: {
    type: Number,
  },
  show: Boolean,
});

// Computed Bulma class
const bulmaColor = computed(() => `is-${props.color}`);

const emit=defineEmits(['update:show']);
function hide(){
  emit('update:show', false);
}

// Auto-hide after duration
watchEffect(() => {
  if (props.show) {
    setTimeout(hide, props.duration);
  }
});
</script>
