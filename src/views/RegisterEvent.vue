<template>
  <form class="max-w-sm mx-auto ">
    <h2 class="mb-5 text-center text-xl font-bold text-gray-900 dark:text-white">
      Registrar Evento ID: {{ eventId }} {{ event.name }}
    </h2>
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Ingresa tu email
      </label>
      <input v-model="userEmail" type="email" id="email" placeholder="example@gmail.com"
        class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700" required />
    </div>

    <button 
     :disabled="!isEmailValid"
      @click.prevent="Event"
      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Enviar
    </button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'RegisterEvent',
  props: {
    eventId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      userEmail: '',
    };
  },
  computed: {
    ...mapState({
      event: (state) => state.event,
    }),
    isEmailValid() {
      return this.userEmail.trim().length > 0;
    },
  },
  methods: {
    ...mapActions(['GET_EVENT', 'REGISTER_EVENT']),
    async Event() {
      try {
        await this.REGISTER_EVENT(
          {
            event_id: this.eventId,
            user_email: this.userEmail
          }
        )
        this.$router.push('/')
      } catch (error) {
        console.error('Error al obtener el evento:', error);
      }
    }
  },
};
</script>

<style scoped></style>
