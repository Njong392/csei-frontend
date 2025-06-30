<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 font-poppins">
        <div class="mx-auto max-w-lg">
            <h1 class="text-center text-2xl font-bold text-blue sm:text-3xl">
                Reset your password
            </h1>

            <p class="mx-auto mt-4 max-w-md text-center text-green-500" v-if="isSuccess">
                Your password has been reset. Go back to the <RouterLink to="/login" class="underline">Login</RouterLink> page and log in with your new password.
            </p>

            <form class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" @submit="handleSubmit">
                <div>
                    <label htmlFor="password" class="sr-only">
                        Password
                    </label>

                    <div class="relative">
                        <BaseInput inputType="password"
                            inputStyle="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            inputPlaceholder="Enter new password" v-model:inputValue="password"
                            @input="() => { isFieldMissing = false }" />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" class="sr-only">
                        Confirm Password
                    </label>

                    <div class="relative">
                        <BaseInput inputType="password"
                            inputStyle="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            inputPlaceholder="Re-enter new password" v-model:inputValue="confirmPassword"
                            @input="() => { isFieldMissing = false }" />
                    </div>
                </div>

                <p class="text-red-400 text-sm" v-if="isFieldMissing">Please fill in all fields</p>
                <p class="text-red-400 text-sm" v-if="error">{{ error }}</p>
                <BaseButton buttonType="submit" buttonStyle="block w-full rounded-lg bg-blue px-5 py-3 text-sm font-medium text-snow
                disabled:opacity-50 cursor-pointer" :disabled="isLoading">
                    <template #buttonLabel>
                        Submit
                    </template>
                </BaseButton>


            </form>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import checkRequiredFields from '@/utils/validation';
import fetchWithCookies from '@/utils/fetchWrapper';
import { ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const password = ref('')
const confirmPassword = ref('')
const isFieldMissing = ref(false)
const baseUrl = `${import.meta.env.VITE_API_URL}/members`;
const isSuccess = ref(false)
const error = ref('')
const isLoading = ref(false)
const route = useRoute()
const token = route.params.token

const handleSubmit = async (e) => {
    e.preventDefault()
    isFieldMissing.value = false
    error.value = ''

    const body = {
        newPassword: password.value
    }

    const missing = checkRequiredFields({ password: password.value, confirmPassword: confirmPassword.value }, ['password', 'confirmPassword'])
    if (missing.length > 0) {
        isFieldMissing.value = true
        return
    }

    if(password.value !== confirmPassword.value){
        error.value = "Passwords do not match"
        isFieldMissing.value = false
        return
    }

    try {
        await fetchWithCookies(`${baseUrl}/reset-password/${token}`, "POST", body, { withCredentials: false })
        isSuccess.value = true
        password.value = ''
        confirmPassword.value = ''
    } catch (err) {
        error.value = err.message
    } finally {
        isLoading.value = false
    }

}

</script>