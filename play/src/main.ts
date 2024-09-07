import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import components from './components/register'
import '@m2-ui/theme-chalk/index.scss'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(components)

app.mount('#app')
