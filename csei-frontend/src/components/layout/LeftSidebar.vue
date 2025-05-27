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
            <ul v-for="sidebarFooterLink in sidebarFooterLinks">
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

            </ul>
        </div>
    </menu>
</template>

<script setup>
import pageConfig from '@/config/pageConfig';
import { RouterLink, useRoute } from 'vue-router';

const sidebarLinks = pageConfig.sidebarLinks
const sidebarFooterLinks = pageConfig.sidebarFooterLinks

const isActiveLink = (routePath) => {
    const route = useRoute()
    return route.path === routePath
}


</script>