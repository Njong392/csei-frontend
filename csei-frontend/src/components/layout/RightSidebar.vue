<template>
    <main class="flex flex-col h-full">
        <!-- Avatar section-->
        <section class="flex flex-col items-center gap-3 p-7">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
                class="h-50 w-50 rounded-full object-cover" alt="">

            <div class="flex flex-col items-center">
                <span class="flex items-start gap-2">
                    <h1 class="text-3xl text-black font-semibold">Emy NJONG</h1>
                    <font-awesome-icon icon="fa-solid fa-pen" class="bg-gray p-1 rounded-full text-white text-xs cursor-pointer"/>
                </span>
                <p class="text-sm text-blue">CSE001</p>
            </div>
        </section>


        <section class="flex flex-col flex-1 divide-y-2 bg-columbia p-7 rounded-t-3xl shadow-lg">
            <!--Account Summary-->
            <div>
                <div v-for="rightMenuDetail in rightMenuDetails" :key="rightMenuDetail.label" class="mb-3">
                    <div class="flex flex-col">
                        <span class="flex items-center gap-1 text-gray">
                            <font-awesome-icon :icon="rightMenuDetail.icon" class="text-xs" :class="rightMenuDetail?.iconStyle" />
                            <h1 class="text-sm">{{ rightMenuDetail.label }}</h1>
                        </span>
                        <h2 :class="rightMenuDetail?.class">{{ rightMenuDetail.data }}</h2>
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

const rightMenuDetails = pageConfig.rightMenuAccountDetails
const rightMenuActions = pageConfig.rightMenuAccountActions
</script>