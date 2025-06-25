<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div
      v-for="field in schema"
      :key="field.key"
      class="field"
    >
      <label class="label">{{ field.label }}</label>
      <component
        :is="field.component"
        v-model="field.model"
        v-bind="field.props"
      />
    </div>

    <button class="button is-primary mt-4" type="submit">Envoyer</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { formSchema as rawSchema } from './formSchema.js'

// Composants utilisés dynamiquement
import BaseInput from './BaseInput.vue'
import BaseTextarea from './BaseTextarea.vue'
import BaseSelect from './BaseSelect.vue'

const components = { BaseInput, BaseTextarea, BaseSelect }
const schema = reactive(
  rawSchema.map(field => ({
    ...field,
    component: components[field.component],
  }))
)

const handleSubmit = () => {
  const result = {}
  schema.forEach(field => {
    result[field.key] = field.model
  })
  console.log('📝 Résultat du formulaire :', result)
}
</script>
