<template>
    <span :class="statusClass" class="px-2 py-1 text-xs font-medium rounded-full">
        {{ status }}
    </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    status: String
})

const statusClass = computed(() => {
    const statusMap = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'in-review': 'bg-blue-100 text-blue-800',
        'approved': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800'
    };
    return statusMap[props.status] || 'bg-gray-100 text-gray-800';
})
</script>