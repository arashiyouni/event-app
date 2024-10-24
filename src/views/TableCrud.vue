<template>
    <div class="m-auto mx-auto p-6">
        <h1 class="text-2xl font-bold mb-6 text-white">Lista de Eventos</h1>

        <button @click="openModal(null)" class="mb-4 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
            Añadir Evento
        </button>

        <table class="max-w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th v-for="column in columns" :key="column.key" class="px-4 py-4">
                        {{ column.label }}
                    </th>
                    <th class="px-4 py-4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="events.length === 0">
                    <td :colspan="columns.length + 1" class="px-4 py-3 text-center">
                        😃 ¡No hay eventos registrados!
                    </td>
                </tr>
                <tr v-for="event in events" :key="event.event_id" class="border-b">
                    <td v-for="column in columns" :key="column.key" class="px-4 py-3">
                        {{ event[column.key] }}
                    </td>
                    <td class="flex items-center px-4 py-3">
                        <button @click="openModal(event)"
                            class="mr-2 bg-blue-700 px-4 py-2 text-sm text-white rounded-lg hover:bg-blue-800">
                            Editar
                        </button>
                        <button @click="deleteEvent(event.event_id)"
                            class="bg-red-700 px-4 py-2 text-sm text-white rounded-lg hover:bg-red-800">
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <Modal :modalActive="modalActive" @close-modal="closeModal" @submit="saveEvent">
            <template v-slot>
                <form @submit.prevent="saveEvent">
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Nombre del Evento</label>
                        <input v-model="currentEvent.name" type="text" class="w-full border p-2 rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Descripción</label>
                        <textarea v-model="currentEvent.description" class="w-full border p-2 rounded"
                            required></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Día del evento</label>
                        <input v-model="currentEvent.date_event" type="date" class="w-full border p-2 rounded"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Ubicación</label>
                        <input v-model="currentEvent.location" type="text" class="w-full border p-2 rounded" required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium">Organizador/a</label>
                        <input v-model="currentEvent.organizer" type="text" class="w-full border p-2 rounded"
                            required />
                    </div>
                    <InputDropdown v-model="currentEvent.category_id" />
                </form>
            </template>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';
import InputDropdown from '@/components/InputDropdown.vue';

export default {
    name: 'EventsView',
    components: { Modal, InputDropdown },
    data() {
        return {
            modalActive: false,
            currentEvent: {
                event_id: null,
                name: '',
                description: '',
                date_event: '',
                location: '',
                organizer: '',
                category_id: ''
            },
            columns: [
                { key: 'name', label: 'Nombre' },
                { key: 'description', label: 'Descripción' },
                { key: 'date_event', label: 'Fecha' },
                { key: 'location', label: 'Ubicación' },
                { key: 'organizer', label: 'Organizador/a' }
            ],
            bodyUpdate: {}
        };
    },
    computed: {
        ...mapState({
            events: (state) => state.allEvent,
        })
    },
    methods: {
        ...mapActions(['GET_ALL_EVENTS', 'CREATE_EVENT', 'UPDATE_EVENT', 'DELETE_EVENT']),

        openModal(event) {
            this.currentEvent = event
                ? { ...event }
                : {
                    event_id: null,
                    name: '',
                    description: '',
                    date_event: '',
                    location: '',
                    organizer: '',
                    category_id: ''
                };
            this.modalActive = true;
        },
        closeModal() {
            this.modalActive = false;
        },
        async saveEvent() {
            const eventData = {
                name: this.currentEvent.name,
                description: this.currentEvent.description,
                date_event: this.currentEvent.date_event,
                location: this.currentEvent.location,
                organizer: this.currentEvent.organizer,
                category_id: this.currentEvent.category_id,
            };
            try {
                if (this.currentEvent.event_id) {
                    await this.UPDATE_EVENT({ event_id: this.currentEvent.event_id, ...eventData });
                } else {
                    // Crear evento si no tiene event_id
                    await this.CREATE_EVENT({...eventData});
                }
                this.closeModal();
                this.GET_ALL_EVENTS();
            } catch (error) {
                console.error('Error al guardar o actualizar el evento:', error);
            }
        },
        async deleteEvent(eventId) {
            try {
                await this.DELETE_EVENT(eventId);
                this.GET_ALL_EVENTS();
            } catch (error) {
                console.error('Error al eliminar el evento:', error);
            }
        },
    },
    mounted() {
        this.GET_ALL_EVENTS();
    },
};
</script>
