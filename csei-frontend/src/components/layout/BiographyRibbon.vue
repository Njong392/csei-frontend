<template>
    <div class="flex justify-end items-center gap-2">
        <BaseInput inputType="text" inputPlaceholder="Search..." inputClass="bg-powder text-sm px-4 py-3 rounded-full shadow-lg outline-none w-1/2"/>

        <font-awesome-icon icon="fa-solid fa-filter" class="text-2xl text-gray cursor-pointer" />

        <font-awesome-icon :icon="tableViews[currentViewIndex].icon" @click="toggleView" class="text-2xl text-gray cursor-pointer" />

    </div>

</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '../base/BaseInput.vue';
import pageConfig from '@/config/pageConfig';

const tableViews = pageConfig.biographyTableViews
const currentViewIndex = ref(0)

const toggleView = () => {
    currentViewIndex.value = (currentViewIndex.value + 1) % tableViews.length;
}
</script>