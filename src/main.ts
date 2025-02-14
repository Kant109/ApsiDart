import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import HighchartsVue from "highcharts-vue";
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(HighchartsVue)

app.mount('#app')

