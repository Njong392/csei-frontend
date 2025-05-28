<template>
    <div class="flex justify-between items-center mb-6">
        <div class="border-blue border-2 shadow-lg rounded-sm overflow-hidden">
            <ul class="flex items-center divide-x-2 divide-gray-200 cursor-pointer">
                <li class="px-3 py-1 text-blue bg-powder">All</li>
                <li class="px-3 py-1">Succeeded</li>
                <li class="px-3 py-1">Failed</li>
            </ul>
        </div>

        <div class="flex gap-4 items-center">
            <BaseInput type="text" placeholder="Search transactions..."
                class="bg-powder text-sm px-3 py-2 rounded-sm shadow-xl outline-none" />

            <font-awesome-icon icon="fa-solid fa-filter" class="text-gray text-2xl cursor-pointer" />

            <BasePagination />


        </div>
    </div>
</template>

<script setup>
import BaseInput from '../base/BaseInput.vue';
import BasePagination from '../base/BasePagination.vue';

</script>