<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 font-poppins" >
        <div class="mx-auto max-w-lg">
            <h1 class="text-center text-2xl font-bold text-blue sm:text-3xl">
                Welcome back!
            </h1>

            <p class="mx-auto mt-4 max-w-md text-center text-deepgray">
                Log in to your account to continue managing your profile and accessing resources.
            </p>

            <form @submit="handleSubmit" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                <p class="text-center text-lg font-medium text-deepgray">
                    Log in to your account
                </p>


                <div>
                    <label htmlFor="unique code" class="sr-only">
                        Unique code
                    </label>

                    <div class="relative">
                        <BaseInput inputType="text"
                            inputStyle="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            inputPlaceholder="Enter unique user code" v-model:inputValue="memberId"
                            @input="() => {isFieldMissing = false; auth.error = null}" />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" class="sr-only">
                        Password
                    </label>

                    <div class="relative">
                        <BaseInput inputType="password"
                            inputStyle="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            inputPlaceholder="Enter password" v-model:inputValue="password"
                            @input="isFieldMissing = false; auth.error = null" />
                    </div>
                </div>

                <p class="text-red-400 text-sm" v-if="isFieldMissing">Please fill in all fields</p>
                <p class="text-red-400 text-sm" v-if="auth.error">{{ auth.error }}</p>
                <BaseButton buttonType="submit" buttonStyle="block w-full rounded-lg bg-blue px-5 py-3 text-sm font-medium text-snow
                disabled:opacity-50 cursor-pointer">
                    <template #buttonLabel>
                        Log in
                    </template>
                </BaseButton>

                <RouterLink to="/request-reset" class="text-center text-sm text-blue">
                    Forgot password?
                </RouterLink>
            </form>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '@/components/base/BaseInput.vue';
import checkRequiredFields from '../../utils/validation';
import pageConfig from '@/config/pageConfig';
import BaseButton from '@/components/base/BaseButton.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/UserAuth';
import { useMemberStore } from '@/stores/MemberData';
import { RouterLink } from 'vue-router';

const memberId = ref('')
const password = ref('')
const requiredFields = pageConfig.loginRequiredFields
const isFieldMissing = ref(false)
const auth = useAuthStore()
const memberStore = useMemberStore()

const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
        memberId: memberId.value,
        password: password.value
    }
    const missing = checkRequiredFields(body, requiredFields)
    if (missing.length > 0) {
        isFieldMissing.value = true;
        return;
    } else{
        const memberId = await auth.login(body)
        if(memberId){
            await memberStore.fetchMember(memberId)
        }

    }
}

</script>