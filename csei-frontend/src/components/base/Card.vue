<template>
    <div class="rounded-lg w-2xl" :class="bgColor">
        <span class="flex flex-col gap-6 p-5 items-left" :class="textColor">
            <p class="text-sm">{{ cardLabel }}</p>
            <span class="flex items-baseline">
                <h1 class="text-3xl font-medium">{{ cardContent }}</h1>
                <p class="text-xs">FCFA</p>
            </span>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    cardContent: String,
    bgColor: String,
    cardLabel: String,
    textColor: String
})
</script>
