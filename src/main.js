import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { directivePlugin } from '@/directives/lazyplugin'
import { componentPlugin } from "@/components";

import '@/styles/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.use(componentPlugin)
app.use(directivePlugin)