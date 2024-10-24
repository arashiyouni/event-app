<template>
    <transition name="fade">
        <div v-if="modalActive" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <!-- Header del modal -->
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-gray-700">{{ title }}</h2>
                    <button @click="$emit('close-modal')" class="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Cuerpo dinámico del modal -->
                <slot />

                <!-- Footer del modal -->
                <div class="flex justify-end mt-4">
                    <button @click="$emit('close-modal')"
                        class="mr-2 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md">
                        Cancelar
                    </button>
                    <button @click="$emit('submit')"
                        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
defineProps({
    modalActive: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: 'Formulario',
    },
});

defineEmits(['close-modal', 'submit']);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
