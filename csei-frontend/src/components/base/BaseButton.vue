<template>
    <button :type="buttonType" :class="buttonStyle">
        <slot name="buttonLabel" />
    </button>

</template>

<script setup>
const props = defineProps({
    buttonType: String,
    buttonStyle: String,
    

})

</script>