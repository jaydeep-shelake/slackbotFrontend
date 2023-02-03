import { createApp,markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar';
import "./assets/css/main.css"
import 'v-calendar/dist/style.css';

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
createApp(App).use(router).use(pinia).use(VCalendar,{}).mount('#app')
