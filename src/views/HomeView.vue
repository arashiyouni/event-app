<template>
  <main>
    <div class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Cards v-for="event in allEvent" :key="event.event_id" :event="event" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Cards from '@/components/Cards.vue'
export default {
  name: 'Main App',
  components: {
    Cards
  },
  computed: {
    ...mapState({
      allEvent: (state) => state.allEvent, // Mapeo del estado desde Vuex
    }),
  },
  methods: {
    ...mapActions(["GET_ALL_EVENTS"]), // Mapeo de la acción desde Vuex
  },
  mounted() {
    // Llamada a la acción para obtener los eventos cuando se monta el componente
    this.GET_ALL_EVENTS();
  },
}
</script>