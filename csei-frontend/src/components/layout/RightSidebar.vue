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
                    class="flex items-center gap-1 mb-3 cursor-pointer hover:bg-gray-200 p-2 rounded transition-colors"
                    @click="handleActionClick(rightMenuAction)">

                    <!-- Show spinner when downloading -->
                    <font-awesome-icon v-if="isDownloading && rightMenuAction.label === 'Download Account statement'"
                        icon="fa-solid fa-spinner" class="text-blue text-xs animate-spin" />
                    <font-awesome-icon v-else :icon="rightMenuAction.icon" class="text-gray text-xs" />

                    <span class="text-sm">{{ rightMenuAction.label }}</span>
                </div>
            </div>


        </section>

        <div v-if="downloadMessage" class="fixed bottom-4 right-4 z-50 max-w-sm">
            <div :class="[
                'p-4 rounded-lg shadow-lg border-l-4',
                downloadMessage.type === 'success'
                    ? 'bg-green-50 border-green-400 text-green-800'
                    : 'bg-red-50 border-red-400 text-red-800'
            ]">
                <div class="flex items-center">
                    <font-awesome-icon
                        :icon="downloadMessage.type === 'success' ? 'fa-solid fa-check-circle' : 'fa-solid fa-exclamation-circle'"
                        class="mr-2" />
                    <p class="text-sm font-medium">{{ downloadMessage.message }}</p>
                </div>
            </div>
        </div>


    </main>
</template>

<script setup>
import pageConfig from '@/config/pageConfig';
import { useAuthStore } from '@/stores/UserAuth';
import { useMemberStore } from '@/stores/MemberData';
import { computed, ref } from 'vue';
import { downloadAccountStatement } from '@/utils/downloadStatement';

const rightMenuActions = pageConfig.rightMenuAccountActions
const auth = useAuthStore()
const memberData = useMemberStore()
const copied = ref(false)
const isDownloading = ref(false)
const downloadMessage = ref(null)

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


const showMessage = (type, message) => {
    downloadMessage.value = { type, message }
    setTimeout(() => {
        downloadMessage.value = null
    }, 4000)
}

const handleActionClick = async (action) => {
    if (action.label === 'Download Account statement') {
        await downloadStatement()
    } else if (action.label === 'Download loan statement') {
        // TODO: Implement loan statement download later
        showMessage('info', 'Loan statement download coming soon!')
    }
}

const downloadStatement = async () => {
    if (isDownloading.value) return // Prevent multiple downloads

    isDownloading.value = true

    try {
        await downloadAccountStatement()
        showMessage('success', 'Account statement downloaded successfully!')
    } catch (error) {
        console.error('Download failed:', error)
        showMessage('error', 'Failed to download account statement. Please try again.')
    } finally {
        isDownloading.value = false
    }
}

</script>