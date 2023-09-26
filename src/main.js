import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

import { directivePlugin } from '@/directives/lazyplugin'
import { componentPlugin } from "@/components";

import '@/styles/common.scss'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(componentPlugin)
app.use(directivePlugin)

app.mount('#app')
