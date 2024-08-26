import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue';
import animacion from './components/animacion.vue';
import login from './components/login.vue';

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/animacion', name: 'animacion', component: animacion },
  { path: '/login', name: 'login', component: login },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;











