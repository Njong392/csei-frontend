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
                    <h1 class="text-3xl font-bold text-deepgray mb-2">Loan Application Details</h1>
                    <p class="text-lightgray">Application #{{ route.params.id }}</p>
                </div>

                <div v-if="application" class="flex items-center gap-4">
                    <StatusBadge :status="application.status" size="large" />
                    <BaseButton
                        v-if="isAdmin && (application.status === 'pending' || application.status === 'under_review')"
                        buttonType="button"
                        buttonStyle="bg-blue text-white px-4 py-2 rounded-md hover:bg-gray transition-colors cursor-pointer"
                        @click="showReviewModal = true">
                        <template #buttonLabel>Review Application</template>
                    </BaseButton>
                </div>
            </div>
        </div>

        <!-- Success Message -->
        <div v-if="updateSuccess" class="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <div class="flex items-center">
                <i class="fas fa-check-circle text-green-400 mr-2"></i>
                <p class="text-green-800">Application status updated successfully! Email notification sent to applicant.
                </p>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex items-center">
                <i class="fas fa-exclamation-circle text-red-400 mr-2"></i>
                <p class="text-red-800">Error loading application details: {{ error }}</p>
            </div>
        </div>

        <!-- Application Details -->
        <div v-else-if="application" class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Application Information Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray">Application Information</h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Application ID</label>
                            <p class="text-lg font-semibold text-deepgray">{{ application.loan_application_id }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Status</label>
                            <StatusBadge :status="application.status" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Submitted Date</label>
                            <p class="text-deepgray">{{ formatDate(application.submitted_at) }}</p>
                        </div>
                        <div v-if="application.reviewed_at">
                            <label class="block text-sm font-medium text-lightgray mb-1">Reviewed Date</label>
                            <p class="text-deepgray">{{ formatDate(application.reviewed_at) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Applicant Information Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray">Applicant Information</h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Name</label>
                            <p class="text-lg font-semibold text-deepgray">{{ application.applicant_name }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Member ID</label>
                            <p class="text-deepgray">{{ application.applicant_id }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Email</label>
                            <p class="text-deepgray">{{ application.applicant_email }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Phone</label>
                            <p class="text-deepgray">{{ application.applicant_phone }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loan Details Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray">Loan Details</h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Requested Amount</label>
                            <p class="text-2xl font-bold text-deepgray">
                                {{ formatAmount(application.amount) }}
                                <span class="text-sm font-normal text-lightgray">FCFA</span>
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Duration</label>
                            <p class="text-lg font-semibold text-deepgray">{{ application.duration }} months</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Engagement Letter Section -->
            <div v-if="application.engagement_letter" class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray">Engagement Letter</h2>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                        <i class="fas fa-file-pdf text-3xl text-red-500"></i>
                        <div class="flex-1">
                            <p class="font-medium text-deepgray">Engagement Letter Document</p>
                            <p class="text-sm text-lightgray">Contains loan purpose and repayment plan</p>
                        </div>
                        <BaseButton buttonType="button"
                            buttonStyle="px-4 py-2 border border-blue text-blue rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                            @click="viewEngagementLetter">
                            <template #buttonLabel>
                                <i class="fas fa-external-link-alt mr-2"></i>View Document
                            </template>
                        </BaseButton>
                    </div>
                </div>
            </div>

            <!-- Guarantors Section -->
            <div v-if="application.guarantors && application.guarantors.length > 0" class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray">Guarantors</h2>
                </div>
                <div class="p-6">
                    <div class="space-y-4">
                        <div v-for="(guarantor, index) in application.guarantors" :key="guarantor.guarantor_id"
                            class="p-4 border border-gray-200 rounded-lg">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-medium text-deepgray">{{ guarantor.guarantor_name }}</h4>
                                    <p class="text-sm text-lightgray">ID: {{ guarantor.guarantor_id }}</p>
                                    <p class="text-sm text-lightgray">Email: {{ guarantor.guarantor_email }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-lightgray">Committed Amount</p>
                                    <p class="text-lg font-semibold text-deepgray">
                                        {{ formatAmount(guarantor.committed_amount) }} FCFA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                <BaseButton buttonType="button"
                    buttonStyle="px-4 py-2 border border-gray-300 rounded-md text-deepgray hover:bg-gray-50 transition-colors cursor-pointer"
                    @click="goBack">
                    <template #buttonLabel>Back to List</template>
                </BaseButton>

                <BaseButton v-if="application.engagement_letter" buttonType="button"
                    buttonStyle="px-4 py-2 border border-blue text-blue rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                    @click="viewEngagementLetter">
                    <template #buttonLabel>
                        <i class="fas fa-download mr-2"></i>Download Letter
                    </template>
                </BaseButton>

                <BaseButton
                    v-if="isAdmin && (application.status === 'pending' || application.status === 'under_review')"
                    buttonType="button"
                    buttonStyle="bg-blue text-white px-4 py-2 rounded-md hover:bg-gray transition-colors cursor-pointer"
                    @click="showReviewModal = true">
                    <template #buttonLabel>Review Application</template>
                </BaseButton>
            </div>
        </div>

        <!-- Review Modal -->
        <LoanReviewModal :is-open="showReviewModal" :application="application" @close="showReviewModal = false"
            @update="updateApplicationStatus" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import StatusBadge from '@/components/layout/StatusBadge.vue'
import LoanReviewModal from '@/components/layout/LoanReviewModal.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/UserAuth'
import formatAmount from '@/utils/formatAmount'
import formatDate from '@/utils/formatDate'
import fetchWithCookies from '@/utils/fetchWrapper'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const baseUrl = `${import.meta.env.VITE_API_URL}/loans`

const application = ref(null)
const loading = ref(true)
const error = ref(null)
const showReviewModal = ref(false)
const updateSuccess = ref(false)

const isAdmin = computed(() => auth.user?.role?.trim() === 'admin')

const fetchApplication = async () => {
    if (auth.isAuthenticated && auth.user.memberId) {
        loading.value = true
        try {
            const res = await fetchWithCookies(`${baseUrl}/${route.params.id}`)
            application.value = res
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
}

const updateApplicationStatus = async ({ status, comments }) => {
    try {
        await fetchWithCookies(
            `${baseUrl}/${application.value.loan_application_id}/review`,
            'PUT',
            { status, comments }
        )

        updateSuccess.value = true
        showReviewModal.value = false
        application.value.status = status
        application.value.reviewed_at = new Date().toISOString()

        // Hide success message after 5 seconds
        setTimeout(() => {
            updateSuccess.value = false
        }, 5000)

    } catch (err) {
        error.value = err.message
    }
}

const viewEngagementLetter = () => {
    // Use the presigned URL that should be generated by the backend
    if (application.value?.engagement_letter_url) {
        window.open(application.value.engagement_letter_url, '_blank');
    } else if (application.value?.engagement_letter) {
        // If no presigned URL, show error message
        alert('Document access unavailable. Please refresh the page and try again.');
    } else {
        alert('No engagement letter available for this application.');
    }
};

const goBack = () => {
    router.back()
}

onMounted(() => {
    fetchApplication()
})
</script>