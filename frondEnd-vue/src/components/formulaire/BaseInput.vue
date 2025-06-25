<template>
  <input
    class="input"
    v-bind="$attrs"
    v-model="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { defineEmits,defineProps,modelValue} from 'vue';
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
