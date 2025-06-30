<template>
    <menu class="flex-col p-7 min-h-screen flex justify-between fixed">
        <main>
            <!--Logo-->
            <h1 class="text-blue font-bold text-6xl pl-3">
                CSEI
            </h1>

            <!--Page links-->
            <div class="mt-8 text-xl flex flex-col gap-8">
                <ul v-for="sidebarLink in sidebarLinks">
                    <RouterLink :to="sidebarLink.route"
                        :class="[isActiveLink(sidebarLink.route) ? 'text-blue' : 'text-black']">
                        <div class="flex gap-6">
                            <span>
                                <font-awesome-icon :icon="sidebarLink.icon" />
                            </span>
                            <span>
                                {{ sidebarLink.label }}
                            </span>
                        </div>

                    </RouterLink>

                </ul>
            </div>
        </main>

        <!--Menu footer-->
        <div class="justify-end text-xl flex flex-col gap-4">
            <ul v-for="sidebarFooterLink in sidebarFooterLinks" :key="sidebarFooterLink.label">
                <li v-if="sidebarFooterLink.action" class="relative">
                    <button @click="handleAction(sidebarFooterLink.action)"
                        class="flex gap-6 w-full text-left text-black hover:text-blue cursor-pointer">
                        <span>
                            <font-awesome-icon :icon="sidebarFooterLink.icon" />
                        </span>
                        <span>
                            {{ sidebarFooterLink.label }}
                        </span>
                    </button>
                    <!--Log out prompt box-->
                    <LogoutPrompt v-if="showLogoutPrompt && sidebarFooterLink.action === 'logout'" @close="closeLogoutPrompt" @confirm="confirmLogout" />
                </li>
                <li v-else>
                    <RouterLink :to="sidebarFooterLink.route"
                        :class="[isActiveLink(sidebarFooterLink.route) ? 'text-blue' : 'text-black']">
                        <div class="flex gap-6">
                            <span>
                                <font-awesome-icon :icon="sidebarFooterLink.icon" />
                            </span>
                            <span>
                                {{ sidebarFooterLink.label }}
                            </span>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </menu>
</template>

<script setup>
import pageConfig from '@/config/pageConfig';
import { RouterLink, useRoute } from 'vue-router';
import LogoutPrompt from './LogoutPrompt.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/UserAuth';

const sidebarLinks = pageConfig.sidebarLinks
const sidebarFooterLinks = pageConfig.sidebarFooterLinks
const showLogoutPrompt = ref(false)
const auth = useAuthStore()

const isActiveLink = (routePath) => {
    const route = useRoute()
    return route.path === routePath
}

const handleAction = (action) => {
    if(action === 'logout'){
        showLogoutPrompt.value = true
    }
}

const closeLogoutPrompt = () => {
    showLogoutPrompt.value = false
}

const confirmLogout = () => {
    showLogoutPrompt.value = false
    auth.logout()
}


</script>