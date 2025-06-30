<template>
    <main class="flex flex-col h-full" v-if="auth.user.memberId && memberData.member">
        <!-- Avatar section-->
        <section class="flex flex-col items-center gap-3 p-7">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                class="h-50 w-50 rounded-full object-cover border border-columbia" alt="">

            <div class="flex flex-col items-center">
                <span class="flex items-start gap-2">
                    <h1 class="text-3xl text-black font-semibold">{{ memberData.member.member_name }}</h1>
                    <font-awesome-icon icon="fa-solid fa-pen"
                        class="bg-gray p-1 rounded-full text-white text-xs cursor-pointer" />
                </span>
                <p class="text-sm text-blue">{{ memberData.member.member_id }}</p>
            </div>
        </section>


        <section class="flex flex-col flex-1 divide-y-2 bg-columbia p-7 rounded-t-3xl shadow-lg">
            <!--Account Summary-->
            <div>
                <div v-for="rightMenuDetail in rightMenuDetails" :key="rightMenuDetail.label" class="mb-3">
                    <div class="flex flex-col">
                        <div v-if="rightMenuDetail.label === 'Click to copy referral link'">
                            <span class="flex items-center gap-1 text-gray">
                                <font-awesome-icon :icon="rightMenuDetail.icon" class="text-xs"
                                    :class="rightMenuDetail?.iconStyle" />
                                <h1 class="text-sm">{{ rightMenuDetail.label }}</h1>
                            </span>
                            <h2 :class="rightMenuDetail.class" class="cursor-pointer"
                                @click="copyToClipboard(rightMenuDetail.data)">
                                {{ rightMenuDetail.data }}
                            </h2>
                            <span v-if="copied" class="text-green-600 text-xs">Copied!</span>
                        </div>
                        <div v-else>
                            <span class="flex items-center gap-1 text-gray">
                                <font-awesome-icon :icon="rightMenuDetail.icon" class="text-xs"
                                    :class="rightMenuDetail?.iconStyle" />
                                <h1 class="text-sm">{{ rightMenuDetail.label }}</h1>
                            </span>
                            <h2 :class="rightMenuDetail?.class">{{ rightMenuDetail.data }}</h2>
                        </div>
                    </div>
                </div>
            </div>


            <!--User files, docs, attachments-->
            <div class="mt-2">
                <div v-for="rightMenuAction in rightMenuActions" :key="rightMenuAction.label"
                    class="flex items-center gap-1 mb-3">
                    <font-awesome-icon :icon="rightMenuAction.icon" class="text-gray text-xs" />
                    <span class="text-sm">{{ rightMenuAction.label }}</span>

                </div>
            </div>


        </section>


    </main>
</template>

<script setup>
import pageConfig from '@/config/pageConfig';
import { useAuthStore } from '@/stores/UserAuth';
import { useMemberStore } from '@/stores/MemberData';
import { computed, ref } from 'vue';

const rightMenuActions = pageConfig.rightMenuAccountActions
const auth = useAuthStore()
const memberData = useMemberStore()
const copied = ref(false)

const rightMenuDetails = computed(() => pageConfig.rightMenuAccountDetails.map(detail => {
    let data = detail.dataKey
        ? (memberData.member?.[detail.dataKey] || detail.fallback || "")
        : detail.data;

    // Dynamically replace ${memberId} in the referral link
    if (typeof data === 'string' && data.includes('${memberId}')) {
        data = data.replace('${memberId}', memberData.member?.member_id || '');
    }

    return {
        ...detail,
        data
    }
}))

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        copied.value = true
        setTimeout(() => copied.value = false, 1500)
    })
}




</script>