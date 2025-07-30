<template>
    <div class="max-w-6xl mx-auto p-6">
        <!-- Header -->
        <div class="mb-6">
            <button @click="goBack" class="flex items-center text-blue hover:text-blue-600 mb-4 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>
                Back to Loan Applications
            </button>

            <div class="flex justify-between items-start">
                <div>
                    <h1 class="text-3xl font-bold text-deepgray mb-2">Loan Application Review</h1>
                    <p class="text-lightgray">Application #{{ route.params.id }}</p>
                </div>

                <div v-if="application" class="flex items-center gap-4">
                    <StatusBadge :status="application.status" size="large" />
                    <BaseButton v-if="application.status === 'pending' || application.status === 'under_review'"
                        buttonType="button"
                        buttonStyle="bg-blue text-white px-4 py-2 rounded-md hover:bg-gray transition-colors cursor-pointer"
                        @click="showReviewModal = true">
                        <template #buttonLabel>Update Status</template>
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
        <div v-else-if="application" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Application Details -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Application Summary Card -->
                <div class="bg-white rounded-lg shadow-lg border border-gray-200">
                    <div class="px-6 py-4 bg-gray-50 border-b">
                        <h2 class="text-xl font-semibold text-deepgray flex items-center">
                            <i class="fas fa-file-invoice text-blue mr-2"></i>
                            Application Summary
                        </h2>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-lightgray mb-1">Application ID</label>
                                <p class="text-lg font-semibold text-deepgray">{{ application.loan_application_id }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-lightgray mb-1">Current Status</label>
                                <StatusBadge :status="application.status" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-lightgray mb-1">Submitted Date</label>
                                <p class="text-deepgray">{{ formatDate(application.submitted_at) }}</p>
                            </div>
                            <div v-if="application.reviewed_at">
                                <label class="block text-sm font-medium text-lightgray mb-1">Last Reviewed</label>
                                <p class="text-deepgray">{{ formatDate(application.reviewed_at) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loan Details Card -->
                <div class="bg-white rounded-lg shadow-lg border border-gray-200">
                    <div class="px-6 py-4 bg-gray-50 border-b">
                        <h2 class="text-xl font-semibold text-deepgray flex items-center">
                            <i class="fas fa-money-bill-wave text-green-500 mr-2"></i>
                            Loan Details
                        </h2>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-lightgray mb-1">Requested Amount</label>
                                <p class="text-3xl font-bold text-deepgray">
                                    {{ formatAmount(application.amount) }}
                                    <span class="text-lg font-normal text-lightgray">FCFA</span>
                                </p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-lightgray mb-1">Duration</label>
                                <p class="text-2xl font-semibold text-deepgray">{{ application.duration }} months</p>
                            </div>
                        </div>

                        <!-- Risk Assessment -->
                        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h4 class="font-medium text-deepgray mb-2">Quick Assessment</h4>
                            <div class="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span class="text-lightgray">Monthly Payment:</span>
                                    <p class="font-medium">{{ formatAmount(Math.round(application.amount /
                                        application.duration)) }} FCFA</p>
                                </div>
                                <div>
                                    <span class="text-lightgray">Risk Level:</span>
                                    <p class="font-medium" :class="getRiskLevelColor(application.amount)">
                                        {{ getRiskLevel(application.amount) }}
                                    </p>
                                </div>
                                <div>
                                    <span class="text-lightgray">Category:</span>
                                    <p class="font-medium">{{ getLoanCategory(application.amount) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Engagement Letter Card -->
                <div v-if="application.engagement_letter" class="bg-white rounded-lg shadow-lg border border-gray-200">
                    <div class="px-6 py-4 bg-gray-50 border-b">
                        <h2 class="text-xl font-semibold text-deepgray flex items-center">
                            <i class="fas fa-file-pdf text-red-500 mr-2"></i>
                            Engagement Letter
                        </h2>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                            <i class="fas fa-file-pdf text-4xl text-red-500"></i>
                            <div class="flex-1">
                                <h4 class="font-medium text-deepgray">Loan Purpose & Repayment Plan</h4>
                                <p class="text-sm text-lightgray mt-1">
                                    Review the applicant's detailed loan purpose and proposed repayment strategy
                                </p>
                            </div>
                            <BaseButton buttonType="button"
                                buttonStyle="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                                @click="viewEngagementLetter">
                                <template #buttonLabel>
                                    <i class="fas fa-external-link-alt mr-2"></i>Open Document
                                </template>
                            </BaseButton>
                        </div>
                    </div>
                </div>

                <!-- Guarantors Card -->
                <div v-if="application.guarantors && application.guarantors.length > 0"
                    class="bg-white rounded-lg shadow-lg border border-gray-200">
                    <div class="px-6 py-4 bg-gray-50 border-b">
                        <h2 class="text-xl font-semibold text-deepgray flex items-center">
                            <i class="fas fa-users text-purple-500 mr-2"></i>
                            Guarantors ({{ application.guarantors.length }})
                        </h2>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div v-for="(guarantor, index) in application.guarantors" :key="guarantor.guarantor_id"
                                class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <div class="flex justify-between items-start">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <i class="fas fa-user text-purple-600"></i>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-deepgray">{{ guarantor.guarantor_name }}</h4>
                                            <p class="text-sm text-lightgray">ID: {{ guarantor.guarantor_id }}</p>
                                            <p class="text-sm text-lightgray">{{ guarantor.guarantor_email }}</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm text-lightgray">Committed Amount</p>
                                        <p class="text-xl font-bold text-deepgray">
                                            {{ formatAmount(guarantor.committed_amount) }} FCFA
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Guarantor Summary -->
                        <div class="mt-4 p-3 bg-purple-50 rounded-lg">
                            <div class="flex justify-between text-sm">
                                <span class="text-lightgray">Total Guaranteed Amount:</span>
                                <span class="font-medium text-deepgray">
                                    {{ formatAmount(getTotalGuaranteedAmount()) }} FCFA
                                </span>
                            </div>
                            <div class="flex justify-between text-sm mt-1">
                                <span class="text-lightgray">Coverage Percentage:</span>
                                <span class="font-medium" :class="getCoverageColor()">
                                    {{ getCoveragePercentage() }}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
                <!-- Applicant Info Card -->
                <div class="bg-white rounded-lg shadow-lg border border-gray-200">
                    <div class="px-6 py-4 bg-gray-50 border-b">
                        <h2 class="text-xl font-semibold text-deepgray flex items-center">
                            <i class="fas fa-user-circle text-blue mr-2"></i>
                            Applicant Details
                        </h2>
                    </div>
                    <div class="p-6">
                        <div class="text-center mb-4">
                            <div
                                class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i class="fas fa-user text-2xl text-blue"></i>
                            </div>
                            <h3 class="font-semibold text-lg text-deepgray">{{ application.applicant_name }}</h3>
                            <p class="text-sm text-lightgray">{{ application.applicant_id }}</p>
                        </div>

                        <div class="space-y-3">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-envelope text-gray-400 w-4"></i>
                                <span class="text-sm text-deepgray">{{ application.applicant_email }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-phone text-gray-400 w-4"></i>
                                <span class="text-sm text-deepgray">{{ application.applicant_phone }}</span>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t">
                            <BaseButton buttonType="button"
                                buttonStyle="w-full px-4 py-2 border border-blue text-blue rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                                @click="viewMemberProfile">
                                <template #buttonLabel>
                                    <i class="fas fa-user mr-2"></i>View Full Profile
                                </template>
                            </BaseButton>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions Card -->
                <div class="bg-white rounded-lg shadow-lg border border-gray-200">
                    <div class="px-6 py-4 bg-gray-50 border-b">
                        <h2 class="text-xl font-semibold text-deepgray">Quick Actions</h2>
                    </div>
                    <div class="p-6 space-y-3">
                        <BaseButton v-if="application.status === 'pending' || application.status === 'under_review'"
                            buttonType="button"
                            buttonStyle="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
                            @click="quickApprove">
                            <template #buttonLabel>
                                <i class="fas fa-check mr-2"></i>Quick Approve
                            </template>
                        </BaseButton>

                        <BaseButton v-if="application.status === 'pending' || application.status === 'under_review'"
                            buttonType="button"
                            buttonStyle="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                            @click="quickReject">
                            <template #buttonLabel>
                                <i class="fas fa-times mr-2"></i>Quick Reject
                            </template>
                        </BaseButton>

                        <BaseButton buttonType="button"
                            buttonStyle="w-full px-4 py-2 bg-blue text-white rounded-md hover:bg-gray transition-colors cursor-pointer"
                            @click="showReviewModal = true">
                            <template #buttonLabel>
                                <i class="fas fa-edit mr-2"></i>Detailed Review
                            </template>
                        </BaseButton>

                        <BaseButton v-if="application.engagement_letter" buttonType="button"
                            buttonStyle="w-full px-4 py-2 border border-gray-300 text-deepgray rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                            @click="viewEngagementLetter">
                            <template #buttonLabel>
                                <i class="fas fa-download mr-2"></i>Download Letter
                            </template>
                        </BaseButton>
                    </div>
                </div>

                <!-- Review History Card -->
                <div v-if="reviewHistory && reviewHistory.length > 0"
                    class="bg-white rounded-lg shadow-lg border border-gray-200">
                    <div class="px-6 py-4 bg-gray-50 border-b">
                        <h2 class="text-xl font-semibold text-deepgray">Review History</h2>
                    </div>
                    <div class="p-6">
                        <div class="space-y-3">
                            <div v-for="review in reviewHistory" :key="review.review_id"
                                class="p-3 border border-gray-200 rounded-lg">
                                <div class="flex justify-between items-start mb-2">
                                    <StatusBadge :status="review.status" />
                                    <span class="text-xs text-lightgray">{{ formatDate(review.reviewed_at) }}</span>
                                </div>
                                <p class="text-sm text-deepgray">{{ review.comments }}</p>
                                <p class="text-xs text-lightgray mt-1">by {{ review.reviewer_name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
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
const reviewHistory = ref([])
const loading = ref(true)
const error = ref(null)
const showReviewModal = ref(false)
const updateSuccess = ref(false)

const fetchApplication = async () => {
    if (auth.isAuthenticated && auth.user.memberId) {
        loading.value = true
        try {
            const res = await fetchWithCookies(`${baseUrl}/${route.params.id}`)
            application.value = res

            // Fetch review history if available (you can add this endpoint to your backend)
            // const historyRes = await fetchWithCookies(`${baseUrl}/${route.params.id}/reviews`)
            // reviewHistory.value = historyRes

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

        setTimeout(() => {
            updateSuccess.value = false
        }, 5000)

    } catch (err) {
        error.value = err.message
    }
}

const quickApprove = () => {
    showReviewModal.value = true
    // You could pre-fill the modal with 'approved' status
}

const quickReject = () => {
    showReviewModal.value = true
    // You could pre-fill the modal with 'rejected' status
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

const viewMemberProfile = () => {
    // Navigate to member profile page
    router.push({ name: 'member-profile', params: { id: application.value.applicant_id } })
}

const getRiskLevel = (amount) => {
    if (amount <= 500000) return 'Low'
    if (amount <= 2000000) return 'Medium'
    return 'High'
}

const getRiskLevelColor = (amount) => {
    const level = getRiskLevel(amount)
    return {
        'text-green-600': level === 'Low',
        'text-yellow-600': level === 'Medium',
        'text-red-600': level === 'High'
    }
}

const getLoanCategory = (amount) => {
    if (amount <= 500000) return 'Personal'
    if (amount <= 2000000) return 'Business'
    return 'Corporate'
}

const getTotalGuaranteedAmount = () => {
    if (!application.value?.guarantors) return 0
    return application.value.guarantors.reduce((total, guarantor) => {
        return total + parseFloat(guarantor.committed_amount || 0)
    }, 0)
}

const getCoveragePercentage = () => {
    if (!application.value) return 0
    const total = getTotalGuaranteedAmount()
    const percentage = (total / application.value.amount) * 100
    return Math.round(percentage)
}

const getCoverageColor = () => {
    const percentage = getCoveragePercentage()
    return {
        'text-red-600': percentage < 50,
        'text-yellow-600': percentage >= 50 && percentage < 80,
        'text-green-600': percentage >= 80
    }
}

const goBack = () => {
    router.push({ name: 'admin-loans' })
}

onMounted(() => {
    fetchApplication()
})
</script>