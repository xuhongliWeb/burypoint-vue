import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import BurypointVue from 'burypoint-vue'
import {options} from './track'
createApp(App)
.use(BurypointVue,options)
.use(router).mount('#app')
