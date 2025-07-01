<template>
    <div class="overflow-auto max-h-screen min-h-[300px]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="item in rows" :key="item.memberId" class="rounded-lg w-full shadow-sm p-5">
                <div class="flex justify-between items-center">
                    <div class="flex gap-3 items-center">
                        <span>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                                class="h-15 w-15 rounded-full object-cover border border-columbia" alt="">
                        </span>
                        <span class="flex flex-col">
                            <p class="text-sm">{{ item.memberId }}</p>
                            <p class="truncate max-w-[120px]">{{ item.memberName }}</p>
                        </span>
                    </div>
                    <span>{{ item.accountBalance }}</span>
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