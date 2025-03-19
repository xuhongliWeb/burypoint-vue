import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import BurypointVue from 'burypoint-vue'

createApp(App)
.use(BurypointVue)
.use(router).mount('#app')
