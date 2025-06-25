// store/themeStore.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'light',
    themes: {
      light: {
        '--bg-color': '#F3F3F3',
        '--text-color': '#15202B',
        '--primary-color': '#3498db',
        '--font-family': 'Arial, sans-serif',
        '--h1-color': '#222222',
        '--h1-size': '1.5rem',
        '--p-color': '#06d421',
        '--p-size': '1rem',
        
      },  
      dark: {
        '--bg-color': '#192734',
        '--text-color': '#E8E8E8',
        '--primary-color': '#e74c3c',
        '--font-family': 'Courier New, monospace',
        '--h1-color': '#f1f1f1',
        '--h1-size': '1.5rem',
        '--p-color': '#cccccc',
        '--p-size': '1rem',
      }
    }
  }),

  actions: {
    applyTheme() {
      const current = this.themes[this.theme]
      for (const [key, value] of Object.entries(current)) {
        document.documentElement.style.setProperty(key, value)
      }
      localStorage.setItem('theme', this.theme)
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.applyTheme()
    },

    initTheme() {
      this.applyTheme()
    }
  }
})
