<template>
    <div class="flex justify-end items-center gap-2">
        <BaseInput inputType="text" inputPlaceholder="Search..." inputStyle="bg-powder text-sm px-4 py-3 rounded-full shadow-lg outline-none w-1/2"/>

        <font-awesome-icon icon="fa-solid fa-filter" class="text-2xl text-gray cursor-pointer" />

        <font-awesome-icon :icon="tableViews[currentViewIndex].icon" @click="onToggleView" class="text-2xl text-gray cursor-pointer" />

    </div>

</template>

<script setup>
import BaseInput from '../base/BaseInput.vue';

const props = defineProps({
    currentViewIndex: Number,
    tableViews: Array,
    onToggleView: Function
})
</script>