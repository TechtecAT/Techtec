import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue';
import animacion from './components/animacion.vue';
import login from './components/login.vue';
import trello from './components/trello.vue';
import trabajadores from './components/trabajadores.vue';
import hoja_servicio from './components/hoja_servicio.vue'

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/animacion', name: 'animacion', component: animacion },
  { path: '/login', name: 'login', component: login },
  { path: '/trello', name: 'trello', component: trello },
  { path: '/trabajadores', name: 'trabajadores', component: trabajadores},
  { path: '/hoja_servicio', name: 'hoja_servicio', component: hoja_servicio },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;











