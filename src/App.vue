<template>
    <div class="min-h-screen bg-gray-800">
        <div class="py-8 flex flex-col justify-center text-center">
            <NavBar />
            <hr class="border-gray-600" />
        </div>
        <router-view />
    </div>
</template>
<script>
import NavBar from './components/NavBar.vue'
export default {
    components: { NavBar }
}
</script>
<style></style>
