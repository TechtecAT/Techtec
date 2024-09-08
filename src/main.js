import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Verifica que la ruta sea correcta

const app = createApp(App)
  .use(router)
  .mount('#app');
