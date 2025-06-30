<template>
    <nav class="flex justify-between items-center p-8 shadow-lg" v-if="memberData.member">
        <!--Welcome message-->
        <h1 class="text-4xl">Welcome, {{ memberData.member.member_name.split(' ')[0] }}</h1>
    </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/UserAuth';
import { useMemberStore } from '@/stores/MemberData';

const auth = useAuthStore()
const memberData = useMemberStore()
</script>