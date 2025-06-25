<template>
  <div>
  
    <button @click="toggleTheme">
      Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Theme
    </button>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/store/PreferencesStore.js'
import { onMounted, computed } from 'vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})

const theme = computed(() => themeStore.theme)
const toggleTheme = () => themeStore.toggleTheme()
</script>
