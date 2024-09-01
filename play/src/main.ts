import { createApp } from 'vue'
import App from './App.vue'
import components from './components'
import '@m2-ui/theme-chalk/index.scss'

const app = createApp(App)

app.use(components)

app.mount('#app')
