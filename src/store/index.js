// src/store/index.js
import { createStore } from "vuex";
import axios from "../plugins/axios.js";

const store = createStore({
  state: {
    allEvent: [],
    categories: [],
    error: null,
    event: "",
    newEvent: {},
    deleteEvent: "",
    updateEvent: "",
    register: "",
  },

  mutations: {
    GET_ALL_EVENTS(state, allEvent) {
      state.allEvent = allEvent;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    GET_EVENT(state, event) {
      state.event = event;
    },
    GET_GATEGORIES(state, categories) {
      state.categories = categories;
    },
    CREATE_EVENT(state, newEvent) {
      state.newEvent = newEvent;
    },
    DELETE_EVENT(state, deleteEvent) {
      state.deleteEvent = deleteEvent;
    },
    UPDATE_EVENT(state, updateEvent) {
      state.updateEvent = updateEvent;
    },
    REGISTER_EVENT(state, register) {
      state.register = register;
    },
  },

  actions: {
    async GET_ALL_EVENTS({ commit }) {
      try {
        const response = await axios.get("/events");
        console.log("💟 | Eventos recibidos:", response.data);
        commit("GET_ALL_EVENTS", response.data);
      } catch (err) {
        console.error("❌ | Error al obtener eventos:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
    async GET_EVENT({ commit }, id) {
      try {
        const response = await axios.get(`/events/${id}`);
        console.log("🌲 | Un evento recibido: ", response.data);
        commit("GET_EVENT", response.data);
      } catch (err) {
        console.error("❌ | Error al obtener eventos:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
    async GET_GATEGORIES({ commit }) {
      try {
        const response = await axios.get("/events/categories");
        console.log("🧡 | Categorias recibidas: ", response.data);
        commit("GET_GATEGORIES", response.data);
      } catch (err) {
        console.error("❌ | Error al obtener categorias:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
    async CREATE_EVENT({ commit }, payload) {
      const event = {
        name: payload.name,
        description: payload.description,
        date_event: payload.date_event,
        location: payload.location,
        organizer: payload.organizer,
        category_id: payload.category_id,
      };

      try {
        const response = await axios.get("/events", event);
        console.log("💥 | Eventos Guardados: ", response.data);
        commit("CREATE_EVENT", response.data);
      } catch (err) {
        console.error("❌ | Error al obtener categorias:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
    //TODO: MEJORAR EL PARAM QUE SE RECIBE EN EL DELETE, CREATE Y UPDATE
    async DELETE_EVENT({ commit }, payload) {
      try {
        const response = await axios.delete(`/events/${payload}`);
        console.log("💥 | Eventos Eliminados: ", response.data);
        commit("DELETE_EVENT", response.data);
      } catch (err) {
        console.error("❌ | Error al eliminar evento:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
    async UPDATE_EVENT({ commit }, payload) {
      try {
        const response = await this.axios(`/events/edit/${payload}`);
        console.log("💥 | Eventos actualizado: ", response.data);
        commit("", response.data);
      } catch (err) {
        console.error("❌ | Error al eliminar evento:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
    //!TODO: AQUI VA EL ENDPOINT DE Enviar Correo
    async REGISTER_EVENT({ commit }, payload) {
      try {
        const response = await axios.post("/events/send-email", payload);
        console.log("✅ | Evento registrado:", response.data);
        commit("REGISTER_EVENT", response.data);
      } catch (err) {
        console.log(
          "URL generada:",
          `/events/add-event?event_id=${event_id}&user_email=${user_email}`
        );
        console.error("❌ | Error al registrar evento:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
  },
});

export default store;
