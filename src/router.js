import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue';
import Animacion from './components/animacion.vue';
import Login from './components/login.vue';
import crud from './components/crud.vue';
import Trabajadores from './components/trabajadores.vue';
import HojaServicio from './components/hoja_servicio.vue';
import DetallesEquipo from './components/detalles_equipo.vue';
import TuEquipo from './components/tu_equipo.vue';
import Admin from './components/admin.vue';
import Altaservicio from './components/alta_servicio.vue';
import servicio from './components/servicio.vue';

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/animacion', name: 'Animacion', component: Animacion },
  { path: '/login', name: 'Login', component: Login },
  { path: '/crud', name: 'crud', component: crud},
  { path: '/login', name: 'Login', component: Login },
  { path: '/trabajadores', name: 'Trabajadores', component: Trabajadores },
  { path: '/hoja_servicio', name: 'HojaServicio', component: HojaServicio },
  { path: '/detalles_equipo', name: 'detalles_equipo', component: DetallesEquipo, props: true },
  { path: '/tu_equipo', name: 'tu_equipo', component: TuEquipo },
  { path: '/admin', name: 'admin', component: Admin },
  { path: '/altaServicio' , name: 'alta_servicio', component: Altaservicio},
  { path: '/Servicio' , name: 'servicio', component: servicio},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;