// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import RegisterEvent from '@/views/RegisterEvent.vue';

const routes = [
  {
    path: '/', // Ruta principal
    name: 'Home',
    component: Home, // Vista con las cards
  },
  {
    path: '/register-event/:id', // Ruta para registro de eventos
    name: 'register',
    component: RegisterEvent, // Vista de registro
    props:  (route) => ({ eventId: Number(route.params.id) })
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
