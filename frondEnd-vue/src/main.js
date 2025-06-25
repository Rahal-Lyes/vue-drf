import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/userStore'
import axios from 'axios'
import 'bulma/css/bulma.css'
import '@/assets/styles/main.scss' 
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(createPinia()) // ou `app.use(pinia)` si tu préfères
app.config.globalProperties.$axios = axios // si tu veux utiliser axios globalement

app.mount('#app')
