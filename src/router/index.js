// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import RegisterEvent from "@/views/RegisterEvent.vue";
import TableCrud from "@/views/TableCrud.vue";

//!TODO: AGREGAR EL PINCHE NAV
const routes = [
  {
    path: "/", // Ruta principal
    name: "Home",
    component: Home,
  },
  {
    path: "/register-event/:id",
    name: "register",
    component: RegisterEvent, // Vista de registro
    props: (route) => ({ eventId: Number(route.params.id) }),
  },
  {
    path: "/crud",
    name: "crud",
    component: TableCrud,
    props: (route) => ({ eventId: Number(route.params.id) }),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
