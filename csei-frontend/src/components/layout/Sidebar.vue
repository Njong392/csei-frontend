<template>
    <menu class="flex-col p-7 min-h-screen flex justify-between fixed">
        <main>
            <!--Logo-->
            <h1 class="text-blue font-bold text-6xl pl-3">
                CSEI
            </h1>

            <!--Page links-->
            <div class="mt-8 text-xl text-black">
                <ul v-for="sidebarLink in sidebarLinks">
                    <li class="p-3">
                        <div class="flex gap-6">
                            <span>
                                <font-awesome-icon :icon="sidebarLink.icon" />
                            </span>
                            <span>
                                {{ sidebarLink.label }}
                            </span>
                        </div>

                    </li>

                </ul>
            </div>
        </main>

        <!--Menu footer-->
        <div class="justify-end text-xl text-black">
            <ul v-for="sidebarFooterLink in sidebarFooterLinks">
                <li class="p-2">
                    <div class="flex gap-6">
                        <span>
                            <font-awesome-icon :icon="sidebarFooterLink.icon" />
                        </span>
                        <span>
                            {{ sidebarFooterLink.label }}
                        </span>
                    </div>
                </li>

            </ul>
        </div>
    </menu>
</template>

<script setup>
import pageConfig from '@/config/pageConfig';

const sidebarLinks = pageConfig.sidebarLinks
const sidebarFooterLinks = pageConfig.sidebarFooterLinks
</script>