import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './assets/main.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService);
app.mount('#app')
