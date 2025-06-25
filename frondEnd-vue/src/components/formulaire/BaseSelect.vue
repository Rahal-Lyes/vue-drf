<template>
  <select
    class="select"
    v-bind="$attrs"
    v-model="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option disabled value="">Sélectionner une option</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
import { defineEmits,defineProps,modelValue} from 'vue';
defineProps({
  modelValue: String,
  options: Array,
})
defineEmits(['update:modelValue'])
</script>
