<template>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 font-poppins">
        <div class="mx-auto max-w-lg">
            <h1 class="text-center text-2xl font-bold text-blue sm:text-3xl">
                Reset your password
            </h1>

            <p class="mx-auto mt-4 max-w-md text-center text-green-500" v-if="isSuccess">
                If your email exists, we will send you a link to reset your password
            </p>

            <form class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" @submit="handleSubmit">
                <p class="text-center text-lg font-medium text-deepgray">
                    Send your email to reset your password
                </p>


                <div>
                    <label htmlFor="email" class="sr-only">
                        Email
                    </label>

                    <div class="relative">
                        <BaseInput inputType="email"
                            inputStyle="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            inputPlaceholder="Enter email" v-model:inputValue="email"
                            @input="() => { isFieldMissing = false }" />
                    </div>
                </div>

                <p class="text-red-400 text-sm" v-if="isFieldMissing">Please provide an email</p>
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

const email = ref('')
const isFieldMissing = ref(false)
const baseUrl = `${import.meta.env.VITE_API_URL}/members`;
const isSuccess = ref(false)
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
        email: email.value
    }

    const missing = checkRequiredFields(body, ['email'])
    if(missing.length > 0){
        isFieldMissing.value = true
        return
    } 

    try{
        await fetchWithCookies(`${baseUrl}/request-password-reset`, "POST", body, {withCredentials: false})
        isSuccess.value = true
    } catch(err){
        error.value = err.message
    } finally{
        isLoading.value = false
    }
    
}

</script>