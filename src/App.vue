<template>
    <h1>Hola</h1>
   <h3>{{  event }}</h3>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Main App',
    computed: {
        ...mapState({
            allEvent: (state) => state.allEvent,
            event: (state) => state.event
        })
    },
    methods: {
        ...mapActions(['GET_ALL_EVENTS', 'GET_EVENT']), 

        async loadEvents() {
            await this.GET_ALL_EVENTS(); 
        },
        async getEvents() {
            await this.GET_EVENT(); 
        },
    },
    mounted(){
            this.loadEvents()
            this.getEvents()
    }

}
</script>

<style></style>
