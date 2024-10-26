<template>
    <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-[#2D3250] dark:border-gray-700 my-4">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#F6B17A]">
            {{ event.name }}
        </h5>

        <p class="mb-3 font-normal text-gray-400  ">
            {{ event.description }}
        </p>
        <p class="mb-2 text-sm font-medium text-gray-400  ">
            <strong>Ubicación:</strong> {{ event.location }}
        </p>
        <p class="mb-4 text-sm font-medium text-gray-400  ">
            <strong>Fecha:</strong> {{ event.date_event }}
        </p>
        <p class="mb-4 text-sm font-medium text-gray-400  ">
            <strong>Organizador/a:</strong> {{ event.organizer }}
        </p>
        <p class="mb-4 text-sm font-medium text-gray-400  ">
            <strong>Categoría:</strong> {{ event.category_id }}
        </p>
        <RouterLink :to="{ name: 'register', params: { id: event.event_id } }" :eventId="event.event_id"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[#7077A1] rounded-lg">
            Registrar Evento
        </RouterLink>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Cards',
    props: {
        event: {
            type: Object,
            required: true,
            nameCategory: ''
        },
    },
    computed: {
        ...mapState({
            categories: (state) => state.categories,
        })
    },
    methods: {
        ...mapActions(['GET_GATEGORIES']),

        goToRegisterEvent(eventId) {
            this.$router.push('/register-event')
        },

        showNameCategory(categoryID) {
            console.log('Oli', this.categories.name)
            return this.categories.name
        }
    },
};
</script>
<style></style>