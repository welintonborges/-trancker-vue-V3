import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import router from "@/roteador/index.js";
import {store, key } from '@/store/index.vue'

createApp(App)
    .use(router)
    .use(store, key)
    .mount('#app')