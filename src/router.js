import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue';
import Animacion from './components/Animacion.vue';
import Login from './components/Login.vue';

import Trabajadores from './components/Trabajadores.vue';
import HojaServicio from './components/Hoja_Servicio.vue';
import DetallesEquipo from './components/Detalles_Equipo.vue';
import TuEquipo from './components/Tu_Equipo.vue';
import Admin from './components/Admin.vue';

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/animacion', name: 'Animacion', component: Animacion },
  { path: '/login', name: 'Login', component: Login },

  { path: '/trabajadores', name: 'Trabajadores', component: Trabajadores },
  { path: '/hoja_servicio', name: 'HojaServicio', component: HojaServicio },
  { path: '/detalles_equipo', name: 'detalles_equipo', component: DetallesEquipo, props: true },
  { path: '/tu_equipo', name: 'tu_equipo', component: TuEquipo },
  { path: '/admin', name: 'admin', component: Admin }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;