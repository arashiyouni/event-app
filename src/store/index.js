// src/store/index.js
import { createStore } from 'vuex';
import axios from '../plugins/axios.js'; 

const store = createStore({
    state: {
        allEvent: [],
        categories: [],
        error: null,
        event: '',
        newEvent: {},
        deleteEvent: ''
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
            state.categories = categories
        },
        CREATE_EVENT(state, newEvent){
            state.newEvent = newEvent
        },
        DELETE_EVENT(state, deleteEvent){
            state.deleteEvent = deleteEvent
        }
        /**
         * TODO:
         * Actualizar un evento
         * Registrar Evento
         */
    },

    actions: {
        async GET_ALL_EVENTS({ commit }) {
            try {
                const response = await axios.get('/events');
                console.log('💟 | Eventos recibidos:', response.data);
                commit('setAllEvents', response.data);
            } catch (err) {
                console.error('❌ | Error al obtener eventos:', err);
                commit('SET_ERROR', err?.response?.data?.detail || 'Error desconocido');
            }
        },
        async GET_EVENT({ commit }) {
            try {
                const response = await axios.get(`/events`, {
                    params: {event_id: id}
                })
                console.log('🌲 | Un evento recibido: ', response.data)
                commit('GET_EVENT', response.data)
            } catch (err) {
                console.error('❌ | Error al obtener eventos:', err);
                commit('SET_ERROR', err?.response?.data?.detail || 'Error desconocido');
            }
        },
        async GET_GATEGORIES({ commit }) {
            try {
                const response = await axios.get('/events/categories')
                console.log('🧡 | Categorias recibidas: ', response.data)
                commit('GET_GATEGORIES', response.data)
            } catch (err) {
                console.error('❌ | Error al obtener categorias:', err);
                commit('SET_ERROR', err?.response?.data?.detail || 'Error desconocido');
            }
        },
        async CREATE_EVENT({ commit }, payload) {
            const event = {
                name: payload.name,
                description: payload.description,
                date_event: payload.date_event,
                location: payload.location,
                organizer: payload.organizer,
                category_id: payload.category_id
            }

            try {
                const response = await axios.get('/events', event)
                console.log('💥 | Eventos Guardados: ', response.data)
                commit('CREATE_EVENT', response.data)
            } catch (err) {
                console.error('❌ | Error al obtener categorias:', err);
                commit('SET_ERROR', err?.response?.data?.detail || 'Error desconocido');
            }
        },
        async DELETE_EVENT({commit}, payload) {
            try{
                const response = await axios.delete(`/events/${payload}`)
                commit('DELETE_EVENT', response.data)
            } catch (err) {
                console.error('❌ | Error al eliminar evento:', err);
                commit('SET_ERROR', err?.response?.data?.detail || 'Error desconocido');
            }
        }
    },
});

export default store;
