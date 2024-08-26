import { createApp } from 'vue';
import App from './App.vue';
import router from '../src/router'



const app = createApp(App)
  .use(router)
  .mount('#app');