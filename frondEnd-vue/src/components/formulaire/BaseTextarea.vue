<template>
  <textarea
    class="textarea"
    v-bind="$attrs"
    v-model="localValue"
  ></textarea>
</template>


<script setup>
import { computed,defineEmits,defineProps } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>
