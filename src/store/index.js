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
      console.log("Payload a guardar evento: ", payload);
      try {
        const response = await axios.post("/events/", payload);
        console.log("💥 | Eventos Guardados: ", response.data);
        commit("CREATE_EVENT", response.data);
      } catch (err) {
        console.error("❌ | Error al obtener categorias:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
    async DELETE_EVENT({ commit }, payload) {
      try {
        const response = await axios.delete(`/events/remove-event/${payload}`);
        console.log("💥 | Eventos Eliminados: ", response.data);
        commit("DELETE_EVENT", response.data);
      } catch (err) {
        console.error("❌ | Error al eliminar evento:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
    async UPDATE_EVENT({ commit }, event) {
      console.log("Payload a editar evento: ", event);
      try {
        const { event_id, ...data } = event;
        const response = await axios.put(`/events/edit/${event_id}`, data);
        console.log("💥 | Eventos actualizado: ", response.data);
        commit("", response.data);
      } catch (err) {
        console.error("❌ | Error al actualizar el evento:", err);
        commit("SET_ERROR", err?.response?.data?.detail || "Error desconocido");
      }
    },
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
