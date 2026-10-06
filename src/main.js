import { createApp } from 'vue'
import { createHead } from 'vue'

import App from './App.vue'
import router from './router'
import 'bootstrap' 
import '@/scss/main.scss';
const app = createApp(App)
const head = createHead()

app.use(router)

app.mount('#app')

app.use(head);