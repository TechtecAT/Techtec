import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue';
import Animacion from './components/Animacion.vue';
import Login from './components/Login.vue';
import Trello from './components/Trello.vue';
import Trabajadores from './components/Trabajadores.vue';
import HojaServicio from './components/Hoja_Servicio.vue';

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/animacion', name: 'Animacion', component: Animacion },
  { path: '/login', name: 'Login', component: Login },
  { path: '/trello', name: 'Trello', component: Trello },
  { path: '/trabajadores', name: 'Trabajadores', component: Trabajadores },
  { path: '/hoja_servicio', name: 'HojaServicio', component: HojaServicio },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;