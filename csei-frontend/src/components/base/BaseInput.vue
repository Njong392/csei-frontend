<template>
        <input :type="inputType" :placeholder="inputPlaceholder" :class="inputStyle" v-model="inputValue">

</template>

<script setup>
const props = defineProps({
    inputType: String,
    inputPlaceholder: String,
    inputStyle: String,
   
})

const inputValue = defineModel('inputValue', {
    type: [String, Number, Date]
})
</script>