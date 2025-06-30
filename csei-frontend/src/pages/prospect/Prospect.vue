<template>
    <section class="bg-white font-poppins">
        <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 place-content-end">
                <img src="https://plus.unsplash.com/premium_photo-1681589452911-055f7f058dce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D"
                    alt="" class="absolute inset-0 h-full w-full object-cover" />
            </aside>

            <main aria-label="Main"
                class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                <div class="w-full max-w-2xl">
                    <h1 className="mt-6 text-2xl font-bold text-deepgray sm:text-3xl md:text-4xl">
                        Apply to become a member
                    </h1>

                    <p className="mt-2 leading-relaxed text-lightgray">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                        nam dolorum aliquam, quibusdam aperiam voluptatum.
                    </p>

                    <form class="mt-5 grid grid-cols-6 gap-6" @submit="handleSubmit">
                        <p class="col-span-6 text-sm text-red-500 mb-2">
                            All fields marked <span class="font-bold">*</span> are obligatory
                        </p>
                        <template v-for="field in fields" :key="field.model">
                            <div :class="field.class">
                                <label :for="field.model" class="block font-medium text-deepgray">
                                    {{ field.label }}
                                    <span v-if="field.optional === false"
                                        class="text-red-500 align-super text-xs">*</span>
                                </label>
                                <template v-if="field.type === 'select'">
                                    <select :id="field.model" v-model="form[field.model]"
                                        class="mt-1 w-full border border-gray-400 bg-white text-sm text-deepgray shadow-sm p-2 rounded-sm">
                                        <option value="" disabled>Select amount</option>
                                        <option v-for="option in field.options" :key="option.value"
                                            :value="option.value">
                                            {{ option.label }}
                                        </option>
                                    </select>
                                </template>
                                <template v-else>
                                    <BaseInput :inputType="field.type" :inputPlaceholder="field.placeholder"
                                        inputStyle="mt-1 w-full border border-gray-400 bg-white text-sm text-deepgray shadow-sm p-2 rounded-sm"
                                        v-model="form[field.model]" @input="error = ''" />
                                </template>
                            </div>
                        </template>

                        <!-- Checkbox handled separately -->
                        <div class="col-span-6 flex items-center">
                            <input type="checkbox" id="swornStatement" name="swornStatement" class="mr-2"
                                v-model="form.swornStatement" />
                            <label for="swornStatement" class="font-medium">
                                By applying to become a member, you agree to our terms and services
                                <span class="text-red-500 align-super text-xs">*</span>
                            </label>
                        </div>

                        <p class="text-red-500 text-sm mb-2 col-span-6" v-if="error">{{ error }}</p>
                        <p class="text-green-500 text-sm mb-2 col-span-6" v-if="isSuccess">Your application has been
                            recorded. Please check your email for updates</p>
                        <div class="col-span-6">
                            <button
                                class="inline-block shrink-0 rounded-md bg-blue px-12 py-3 text-sm font-medium transition cursor-pointer"
                                type="submit" :disabled="isLoading">
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import pageConfig from '@/config/pageConfig'
import checkRequiredFields from '@/utils/validation'
import fetchWithCookies from '@/utils/fetchWrapper'
import { useRoute } from 'vue-router'

const form = ref({
  prospectName: '',
  dateOfBirth: '',
  firstAddressLine: '',
  secondAddressLine: '',
  city: '',
  country: '',
  firstTelephoneLine: '',
  secondTelephoneLine: '',
  email: '',
  emergencyContact: '',
  emergencyEmail: '',
  emergencyPhonenumber: '',
  telegramContact: '',
  monthlyCommitment: null,
  swornStatement: false,
  telegramContact: '',
})

const fields = pageConfig.prospectFormFields
const requiredFields = [
    ...fields.filter(field => field.optional === false).map(field => field.model, 'swornStatement')
]
const error = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)
const baseUrl = `${import.meta.env.VITE_API_URL}/prospects`
const route = useRoute()
const referrerId = route.query.referrerId

const handleSubmit = async (e) => {
    e.preventDefault()
    isLoading.value = true
    error.value = ''
    isSuccess.value = false

    // Validate required fields
    const missing = checkRequiredFields(form.value, requiredFields)
    if(missing.length > 0){
        error.value = "Please fill in all required fields"
        isLoading.value = false
        return
    }

    try{
        await fetchWithCookies(baseUrl, "POST", {...form.value, referrerId, prospectStatus: 'pending'}, {withCredentials: false})
        isSuccess.value = true
    } catch(err){
        error.value = err.message
    } finally{
        isLoading.value = false
        
    }

}

</script>