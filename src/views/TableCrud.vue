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
            <tbody class="max-w-xs">
                <tr v-if="events.length === 0">
                    <td :colspan="columns.length + 1" class="px-4 py-3 text-center">
                        😃 ¡No hay eventos registrados!
                    </td>
                </tr>
                <tr v-for="event in events" :key="event.id" class="border-b">
                    <td v-for="column in columns" :key="column.key" class="px-4 py-3 ">
                        {{ event[column.key] }}
                    </td>
                    <td class="flex items-center px-4 py-3">
                        <button @click="openModal(event)"
                            class="mr-2 bg-blue-700 px-4 py-2 text-sm text-white rounded-lg hover:bg-blue-800">
                            Editar
                        </button>
                        <button @click="deleteEvent(event.id)"
                            class="bg-red-700 px-4 py-2 text-sm text-white rounded-lg hover:bg-red-800">
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Paginación -->
        <div class="flex justify-center mt-4">
            <button @click="changePage(page - 1)" :disabled="page === 1"
                class="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400">
                Anterior
            </button>
            <!--TODO: MEJORAR EL TOTALPAGE-->
            <button v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)" :class="[
                'px-4 py-2 mx-1 rounded',
                pageNumber === page ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
            ]">
                {{ pageNumber }}
            </button>
            <button @click="changePage(page + 1)" :disabled="page === totalPages"
                class="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400">
                Siguiente
            </button>
        </div>

        <!--Modal-->
        <!--TODO: VERIFICAR EL MODAL CON LOS CAMPOS REQUERIDOS -->
        <Modal :modalActive="modalActive" @close-modal="closeModal">
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
                    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Guardar
                    </button>
                </form>
            </template>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';

export default {
    name: 'EventsView',
    components: { Modal },
    data() {
        return {
            modalActive: false,
            currentEvent: {
                id: null,
                name: '',
                description: '',
            },
            columns: [
                { key: 'name', label: 'Nombre' },
                { key: 'description', label: 'Descripción' },
                { key: 'date_event', label: 'Fecha' },
                { key: 'location', label: 'Ubicación' },
                { key: 'organizer', label: 'Organizador/a' }
            ],
            itemsPerPage: 6,
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
            this.currentEvent = event ? { ...event } : { id: null, name: '', description: '' };
            this.modalActive = true;
        },
        closeModal() {
            this.modalActive = false;
        },
        async saveEvent() {
            try {
                if (this.currentEvent.id) {
                    await this.UPDATE_EVENT(this.currentEvent);
                } else {
                    await this.CREATE_EVENT(this.currentEvent);
                }
                this.closeModal();
                this.GET_ALL_EVENTS();
            } catch (error) {
                console.error('Error al guardar el evento:', error);
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

<style>
/* .container {
    max-width: 1000px;
    margin: auto;
} */
</style>
