<template>
    <div class="mb-4">
        <label class="block text-sm font-medium">Categoría</label>
        <div class="relative">
            <button id="dropdown-button" @click="toggleDropdown"
                class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg  hover:bg-gray-200 "
                type="button">
                {{ selectedCategoryName || 'Seleccionar categoría' }}
                <svg class="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div v-if="dropdownActive"
                class="absolute z-10 mt-1 w-full bg-white divide-y divide-gray-100 rounded-lg shadow d">
                <ul class="py-2 text-sm text-gray-700 dark:text-black">
                    <li v-for="category in categories" :key="category.category_event_id" @click="selectCategory(category)"
                        class="px-4 py-2 hover:bg-blue-100 dark:hover:text-black cursor-pointer">
                        {{ category.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            dropdownActive: false,
            selectedCategory: null,
        };
    },
    computed: {
        ...mapState({
            categories: (state) => state.categories, // Obtener categorías del store
        }),
        selectedCategoryName() {
            return this.selectedCategory ? this.selectedCategory.name : '';
        },
    },
    methods: {
        ...mapActions(['GET_GATEGORIES']), // Acción para obtener categorías
        toggleDropdown() {
            this.dropdownActive = !this.dropdownActive;
        },
        selectCategory(category) {
            this.selectedCategory = category;
            this.$emit('update:modelValue', category.category_event_id); // Actualizar el modelo con el ID seleccionado
            this.dropdownActive = false; // Cerrar el dropdown
        },
    },
    mounted() {
        this.GET_GATEGORIES(); // Cargar categorías al montar el componente
    },
};
</script>

<style scoped>
/* Asegurar que el dropdown se vea bien en todas las pantallas */
.relative {
    position: relative;
}

ul {
    max-height: 200px;
    overflow-y: auto;
}
</style>