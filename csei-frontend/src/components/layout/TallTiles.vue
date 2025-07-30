<template>
    <div class="overflow-auto max-h-screen min-h-[300px]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="item in rows" :key="item.memberId"
                class="rounded-sm w-full shadow-lg flex flex-col bg-gray-100 items-center">
                
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                        class="h-16 w-16 rounded-full object-cover aspect-square m-5" alt="">
                

                <div class="flex justify-between items-center w-full h-full p-2 bg-white">
                    <span class="flex flex-col gap-1">
                        <p class="text-xs font-semibold">{{ item.memberId }}</p>
                        <p class="text-sm text-gray-500">{{ item.memberName }}</p>

                    </span>
                    <p class="text-sm">{{ item.accountBalance }} <span class="text-xs text-gray-400">FCFA</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    rows: Array
})
</script>