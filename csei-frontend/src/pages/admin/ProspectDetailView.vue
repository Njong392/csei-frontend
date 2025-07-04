<template>
    <div class="max-w-4xl mx-auto p-6">
        <!-- Header -->
        <div class="mb-6">
            <button @click="goBack" class="flex items-center text-blue hover:text-blue-600 mb-4 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>
                Back to Applications
            </button>

            <div class="flex justify-between items-start">
                <div>
                    <h1 class="text-3xl font-bold text-deepgray mb-2">Prospect Application Details</h1>
                    <p class="text-lightgray">Review and manage prospect application status</p>
                </div>

                <div class="flex items-center gap-4">
                    <status-badge v-if="prospect" :status="prospect.prospect_status" size="large" />
                    <BaseButton v-if="prospect" buttonType="button"
                        buttonStyle="bg-blue text-white px-4 py-2 rounded-md hover:bg-gray transition-colors cursor-pointer disabled:opacity-50"
                        @click="showStatusModal = true"
                        :disabled="prospect.prospect_status === 'approved'">
                        <template #buttonLabel>
                          Update Status
                        </template>
                    </BaseButton>
                </div>
            </div>
        </div>

        <!-- Success Message -->
        <div v-if="updateSuccess" class="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <div class="flex items-center">
                <i class="fas fa-check-circle text-green-400 mr-2"></i>
                <p class="text-green-800">Status updated successfully! Email notification sent to prospect.</p>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex items-center">
                
                <p class="text-red-800">Error loading prospect details: {{ error }}</p>
            </div>
        </div>

        <!-- Prospect Details -->
        <div v-else-if="prospect" class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Personal Information Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray flex items-center">
                        
                        Personal Information
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Full Name</label>
                            <p class="text-lg font-semibold text-deepgray">{{ prospect.prospect_name }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Date of Birth</label>
                            <p class="text-deepgray">{{ formatDate(prospect.date_of_birth) }} ({{
                                calculateAge(prospect.date_of_birth) }} years old)</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Email</label>
                            <p class="text-deepgray">{{ prospect.email }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Primary Phone</label>
                            <p class="text-deepgray">{{ prospect.first_telephone_line }}</p>
                        </div>
                        <div v-if="prospect.second_telephone_line">
                            <label class="block text-sm font-medium text-lightgray mb-1">Secondary Phone</label>
                            <p class="text-deepgray">{{ prospect.second_telephone_line }}</p>
                        </div>
                        <div v-if="prospect.telegram_contact">
                            <label class="block text-sm font-medium text-lightgray mb-1">Telegram</label>
                            <p class="text-deepgray">{{ prospect.telegram_contact }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Address Information Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray flex items-center">
                        
                        Address Information
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Address Line 1</label>
                            <p class="text-deepgray">{{ prospect.first_address_line }}</p>
                        </div>
                        <div v-if="prospect.second_address_line">
                            <label class="block text-sm font-medium text-lightgray mb-1">Address Line 2</label>
                            <p class="text-deepgray">{{ prospect.second_address_line }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">City</label>
                            <p class="text-deepgray">{{ prospect.city }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Country</label>
                            <p class="text-deepgray">{{ prospect.country }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Emergency Contact Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray flex items-center">
                        <i class="fas fa-phone mr-2 text-blue"></i>
                        Emergency Contact
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Contact Name</label>
                            <p class="text-deepgray">{{ prospect.emergency_contact }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Phone Number</label>
                            <p class="text-deepgray">{{ prospect.emergency_phonenumber }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Email</label>
                            <p class="text-deepgray">{{ prospect.emergency_email }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Financial Information Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray flex items-center">
                        <i class="fas fa-money-bill-wave mr-2 text-blue"></i>
                        Financial Information
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Monthly Commitment</label>
                            <p class="text-2xl font-bold text-deepgray">
                                {{ formatAmount(prospect.monthly_commitment) }}
                                <span class="text-sm font-normal text-lightgray">FCFA</span>
                            </p>
                        </div>
                        <div v-if="prospect.referrer_id">
                            <label class="block text-sm font-medium text-lightgray mb-1">Referrer ID</label>
                            <p class="text-deepgray">{{ prospect.referrer_id }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Application Status Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray flex items-center">
                        
                        Application Status
                    </h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Current Status</label>
                            <StatusBadge :status="prospect.prospect_status" size="large" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Application Date</label>
                            <p class="text-deepgray">{{ formatDate(prospect.submitted_at) }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Terms Agreed</label>
                            <p class="text-deepgray">
                               
                                {{ prospect.sworn_statement ? 'Yes' : 'No' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                <BaseButton buttonType="button"
                    buttonStyle="px-4 py-2 border border-gray-300 rounded-md text-deepgray hover:bg-gray-50 transition-colors cursor-pointer"
                    @click="goBack">
                    <template #buttonLabel>
                       Back to List
                    </template>
                </BaseButton>

                <BaseButton buttonType="button"
                    buttonStyle="bg-blue text-white px-4 py-2 rounded-md hover:bg-gray transition-colors cursor-pointer disabled:opacity-50"
                    @click="showStatusModal = true"
                    :disabled="prospect.prospect_status === 'approved'">
                    <template #buttonLabel>
                        Update Status
                    </template>
                </BaseButton>
            </div>
        </div>

        <!-- Status Update Modal -->
        <StatusUpdateModal :is-open="showStatusModal" :current-status="prospect?.prospect_status"
            :prospect-name="prospect?.prospect_name" @close="showStatusModal = false" @update="updateProspectStatus" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import StatusBadge from '@/components/layout/StatusBadge.vue';
import StatusUpdateModal from '@/components/layout/StatusUpdateModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/UserAuth';
import formatAmount from '@/utils/formatAmount';
import formatDate from '@/utils/formatDate';
import calculateAge from '@/utils/calculateAge';
import fetchWithCookies from '@/utils/fetchWrapper';

const prospect = ref(null)
const loading = ref(true)
const error = ref(null)
const showStatusModal = ref(false)
const updateSuccess = ref(false)
const route = useRoute()
const auth = useAuthStore()
const router = useRouter()

const baseUrl = `${import.meta.env.VITE_API_URL}/prospects/${route.params.id}`

const fetchProspect = async() => {
    if (auth.isAuthenticated && auth.user.memberId) {
        loading.value = true
        try {
            const res = await fetchWithCookies(`${baseUrl}`)
            prospect.value = res
            //console.log(memberTransaction.value)
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
}

const updateProspectStatus = async({ status, comment}) => {
    try{
        await fetchWithCookies(`${baseUrl}`, "PATCH", {
            status: status,
            comment: comment,
            modifiedBy: auth.user.memberId
        })
        updateSuccess.value = true
        showStatusModal.value = false
        prospect.value.prospect_status = status
    } catch(err){
        error.value = err.message
    }
}

const goBack = () => {
    router.back()
}

onMounted(() => {
    fetchProspect()

})


</script>