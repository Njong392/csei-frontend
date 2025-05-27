<template>
    <input :type="inputType" :placeholder="inputPlaceholder" :class="inputStyle">
    
</template>

<script setup>
const props = defineProps({
    inputType: String,
    inputPlaceholder: String,
    inputStyle: String,
})
</script>