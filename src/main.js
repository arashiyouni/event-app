// import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style.css";
// Importa Vuetify y los estilos necesarios
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Estilos globales de Vuetify
import "@mdi/font/css/materialdesignicons.css"; // Iconos

// Crea la instancia de Vuetify
const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1E88E5",
          secondary: "#26C6DA",
        },
      },
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);
app.mount("#app");
