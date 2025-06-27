<template>
    <nav class="flex justify-between items-center p-8 shadow-lg" v-if="auth.user">
        <!--Welcome message-->
        <h1 class="text-4xl">Welcome, {{ auth.user.member_name.split(' ')[0] }}</h1>
    </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/UserAuth';

const auth = useAuthStore()
</script>