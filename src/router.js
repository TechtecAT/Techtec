import { createRouter, createWebHistory } from 'vue-router';
import Inicio from './components/Inicio.vue';
import Animacion from './components/animacion.vue';
import menu from './components/menu.vue';
import Login from './components/login.vue';
import panel from './components/panel.vue';
import HojaServicio from './components/hoja_servicio.vue';
import DetallesEquipo from './components/detalles_equipo.vue';
import TuEquipo from './components/tu_equipo.vue';
import Admin from './components/admin.vue';
import Altaservicio from './components/alta_servicio.vue';
import servicio from './components/servicio.vue';
import cotizacion from './components/cotizacion.vue';
import hoja_servicio_print from './components/hoja_servicio_print.vue';

const routes = [
  { path: '/', name: 'Inicio', component: Inicio },
  { path: '/animacion', name: 'Animacion', component: Animacion },
  { path: '/menu', name: 'menu', component: menu },
  { path: '/login', name: 'Login', component: Login },
  { path: '/panel', name: 'panel', component: panel, meta: { requiresAuth: true } },
  { path: '/hoja_servicio', name: 'HojaServicio', component: HojaServicio, meta: { requiresAuth: true } },
  { path: '/detalles_equipo', name: 'detalles_equipo', component: DetallesEquipo, props: true, meta: { requiresAuth: true } },
  { path: '/tu_equipo', name: 'tu_equipo', component: TuEquipo, meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/altaServicio', name: 'alta_servicio', component: Altaservicio, meta: { requiresAuth: true } },
  { path: '/Servicio', name: 'servicio', component: servicio, meta: { requiresAuth: true } },
  { path: '/Cotizacion', name: 'cotizacion', component: cotizacion, meta: { requiresAuth: true } },
  { path: '/hoja_servicio_print/:idServicio', name: 'hoja_servicio_print', component: hoja_servicio_print, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
