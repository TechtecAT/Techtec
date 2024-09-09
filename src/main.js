import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import 'bootstrap'; // Importa los scripts de Bootstrap

const app = createApp(App);
app.use(router);
app.mount('#app');

