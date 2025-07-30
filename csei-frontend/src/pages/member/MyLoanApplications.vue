<template>
    <main class="mt-4 p-5">
        <div class="mb-6">
            <h1 class="text-black font-medium text-3xl mb-4">My Loan Applications</h1>

            <div class="flex justify-between items-center">
                <p class="text-lightgray">Track the status of your loan applications</p>

                <RouterLink to="/loans/apply">
                    <BaseButton buttonType="button"
                        buttonStyle="bg-blue text-white px-4 py-2 rounded-md hover:bg-gray transition-colors cursor-pointer">
                        <template #buttonLabel>
                            <i class="fas fa-plus mr-2"></i>New Application
                        </template>
                    </BaseButton>
                </RouterLink>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-red-500 text-center p-4">
            <p>Error loading loan applications: {{ error }}</p>
        </div>

        <!-- Applications List -->
        <div v-else-if="applications && applications.length > 0" class="space-y-4">
            <div v-for="application in applications" :key="application.loan_application_id"
                class="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-deepgray">
                                Application #{{ application.loan_application_id }}
                            </h3>
                            <p class="text-sm text-lightgray">
                                Submitted on {{ formatDate(application.submitted_at) }}
                            </p>
                        </div>
                        <StatusBadge :status="application.status" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Loan Amount</label>
                            <p class="text-lg font-semibold text-deepgray">
                                {{ formatAmount(application.amount) }}
                                <span class="text-sm font-normal text-lightgray">FCFA</span>
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-lightgray mb-1">Duration</label>
                            <p class="text-deepgray">{{ application.duration }} months</p>
                        </div>
                        <div v-if="application.reviewed_at">
                            <label class="block text-sm font-medium text-lightgray mb-1">Reviewed Date</label>
                            <p class="text-deepgray">{{ formatDate(application.reviewed_at) }}</p>
                        </div>
                    </div>

                    <!-- Status-specific information -->
                    <div v-if="application.status === 'approved'"
                        class="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle text-green-400 mr-2"></i>
                            <p class="text-green-800 text-sm">
                                Congratulations! Your loan has been approved. Our team will contact you for
                                disbursement.
                            </p>
                        </div>
                    </div>

                    <div v-else-if="application.status === 'rejected'"
                        class="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-times-circle text-red-400 mr-2"></i>
                            <p class="text-red-800 text-sm">
                                Your loan application was not approved. Please contact support for more information.
                            </p>
                        </div>
                    </div>

                    <div v-else-if="application.status === 'requires_more_info'"
                        class="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-info-circle text-yellow-400 mr-2"></i>
                            <p class="text-yellow-800 text-sm">
                                Additional information is required. Please check your email or contact our support team.
                            </p>
                        </div>
                    </div>

                    <div v-else class="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-clock text-blue-400 mr-2"></i>
                            <p class="text-blue-800 text-sm">
                                Your application is being reviewed. You will be notified once a decision is made.
                            </p>
                        </div>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex justify-end gap-3">
                        <BaseButton buttonType="button"
                            buttonStyle="px-4 py-2 border border-gray-300 rounded-md text-deepgray hover:bg-gray-50 transition-colors cursor-pointer"
                            @click="viewApplication(application.loan_application_id)">
                            <template #buttonLabel>View Details</template>
                        </BaseButton>

                        <BaseButton v-if="application.engagement_letter" buttonType="button"
                            buttonStyle="px-4 py-2 border border-blue text-blue rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                            @click="downloadEngagementLetter(application.engagement_letter_url)">
                            <template #buttonLabel>
                                <i class="fas fa-download mr-2"></i>Download Letter
                            </template>
                        </BaseButton>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
            <i class="fas fa-file-invoice-dollar text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-medium text-deepgray mb-2">No Loan Applications</h3>
            <p class="text-lightgray mb-6">You haven't submitted any loan applications yet.</p>

            <RouterLink to="/loans/apply">
                <BaseButton buttonType="button"
                    buttonStyle="bg-blue text-white px-6 py-3 rounded-md hover:bg-gray transition-colors cursor-pointer">
                    <template #buttonLabel>
                        <i class="fas fa-plus mr-2"></i>Submit Your First Application
                    </template>
                </BaseButton>
            </RouterLink>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import StatusBadge from '@/components/layout/StatusBadge.vue'
import { useAuthStore } from '@/stores/UserAuth'
import fetchWithCookies from '@/utils/fetchWrapper'
import formatAmount from '@/utils/formatAmount'
import formatDate from '@/utils/formatDate'
import { RouterLink, useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const baseUrl = `${import.meta.env.VITE_API_URL}/loans`

const applications = ref([])
const loading = ref(true)
const error = ref(null)

const fetchApplications = async () => {
    if (auth.isAuthenticated && auth.user.memberId) {
        loading.value = true
        try {
            const res = await fetchWithCookies(`${baseUrl}/my-applications`)
            applications.value = res
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
}

const viewApplication = (applicationId) => {
    router.push({ name: 'loan-detail', params: { id: applicationId } })
}

const downloadEngagementLetter = (url) => {
    window.open(url, '_blank')
}

onMounted(() => {
    fetchApplications()
})
</script>