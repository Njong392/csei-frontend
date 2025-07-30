<template>
    <main class="mt-4 p-5">
        <div class="mb-6">
            <h1 class="text-black font-medium text-3xl mb-4">Loan Applications</h1>

            <!-- Statistics Cards -->
            <div v-if="stats" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="flex items-center">
                        <i class="fas fa-file-invoice text-2xl text-blue mr-3"></i>
                        <div>
                            <p class="text-sm text-lightgray">Total Applications</p>
                            <p class="text-2xl font-bold text-deepgray">{{ stats.total_applications || 0 }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="flex items-center">
                        <i class="fas fa-clock text-2xl text-yellow-500 mr-3"></i>
                        <div>
                            <p class="text-sm text-lightgray">Pending Review</p>
                            <p class="text-2xl font-bold text-deepgray">{{ (stats.pending || 0) + (stats.under_review ||
                                0) }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-2xl text-green-500 mr-3"></i>
                        <div>
                            <p class="text-sm text-lightgray">Approved</p>
                            <p class="text-2xl font-bold text-deepgray">{{ stats.approved || 0 }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="flex items-center">
                        <i class="fas fa-money-bill-wave text-2xl text-blue mr-3"></i>
                        <div>
                            <p class="text-sm text-lightgray">Total Approved Amount</p>
                            <p class="text-lg font-bold text-deepgray">
                                {{ formatAmount(stats.total_approved_amount || 0) }}
                                <span class="text-sm font-normal">FCFA</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters and Search -->
            <div class="flex justify-between items-center mb-6">
                <div class="flex gap-4 items-center">
                    <!-- Status Filter -->
                    <select v-model="selectedStatus"
                        class="bg-powder text-sm px-4 py-3 rounded-sm shadow-lg outline-none border border-gray-300">
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="under_review">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="requires_more_info">Requires More Info</option>
                    </select>

                    <!-- Amount Range Filter -->
                    <select v-model="selectedAmountRange"
                        class="bg-powder text-sm px-4 py-3 rounded-sm shadow-lg outline-none border border-gray-300">
                        <option value="all">All Amounts</option>
                        <option value="0-500000">Under 500K FCFA</option>
                        <option value="500000-1000000">500K - 1M FCFA</option>
                        <option value="1000000-5000000">1M - 5M FCFA</option>
                        <option value="5000000+">Above 5M FCFA</option>
                    </select>
                </div>

                <div class="flex gap-4 items-center">
                    <!-- Search Input -->
                    <BaseInput inputType="text" inputPlaceholder="Search applications..."
                        inputStyle="bg-powder text-sm px-4 py-3 rounded-full shadow-lg outline-none w-80"
                        v-model:inputValue="searchQuery" />
                </div>
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

        <!-- Applications Table -->
        <div v-else>
            <BaseTable :columns="tableColumns" :rows="filteredApplications">
                <template #tableData="{ rows }">
                    <tr v-for="application in rows" :key="application.loan_application_id"
                        class="hover:bg-gray-50 cursor-pointer">
                        <td class="px-3 py-4 whitespace-nowrap">
                            <div class="font-medium text-deepgray">{{ application.loan_application_id }}</div>
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap">
                            <div class="font-medium text-deepgray">{{ application.applicant_name }}</div>
                            <div class="text-sm text-lightgray">{{ application.applicant_id }}</div>
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap text-sm">
                            <span class="font-medium">{{ formatAmount(application.amount) }}</span>
                            <span class="text-xs text-gray"> FCFA</span>
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap text-sm text-lightgray">
                            {{ application.duration }} months
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap">
                            <StatusBadge :status="application.status" />
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap text-sm text-lightgray">
                            {{ formatDate(application.submitted_at) }}
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap text-sm text-lightgray">
                            {{ application.reviewed_at ? formatDate(application.reviewed_at) : '-' }}
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap">
                            <div class="flex gap-2">
                                <BaseButton buttonType="button"
                                    buttonStyle="bg-blue text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer"
                                    @click="viewApplication(application.loan_application_id)">
                                    <template #buttonLabel>View</template>
                                </BaseButton>

                                <BaseButton
                                    v-if="application.status === 'pending' || application.status === 'under_review'"
                                    buttonType="button"
                                    buttonStyle="bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer"
                                    @click="openReviewModal(application)">
                                    <template #buttonLabel>Review</template>
                                </BaseButton>
                            </div>
                        </td>
                    </tr>
                </template>
            </BaseTable>

            <!-- Empty State -->
            <div v-if="filteredApplications.length === 0" class="text-center py-8">
                <i class="fas fa-file-invoice-dollar text-6xl text-gray-300 mb-4"></i>
                <p class="text-lg text-lightgray">No loan applications found</p>
                <p class="text-sm text-gray">Try adjusting your search or filter criteria</p>
            </div>
        </div>

        <!-- Loan Review Modal -->
        <LoanReviewModal :is-open="showReviewModal" :application="selectedApplication" @close="showReviewModal = false"
            @update="reviewApplication" />
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import StatusBadge from '@/components/layout/StatusBadge.vue'
import LoanReviewModal from '@/components/layout/LoanReviewModal.vue'
import { useAuthStore } from '@/stores/UserAuth'
import fetchWithCookies from '@/utils/fetchWrapper'
import formatAmount from '@/utils/formatAmount'
import formatDate from '@/utils/formatDate'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const baseUrl = `${import.meta.env.VITE_API_URL}/loans`

const applications = ref([])
const stats = ref(null)
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedStatus = ref('all')
const selectedAmountRange = ref('all')
const showReviewModal = ref(false)
const selectedApplication = ref(null)

const tableColumns = [
    { key: 'loan_application_id', label: 'Application ID' },
    { key: 'applicant_name', label: 'Applicant' },
    { key: 'amount', label: 'Amount' },
    { key: 'duration', label: 'Duration' },
    { key: 'status', label: 'Status' },
    { key: 'submitted_at', label: 'Submitted' },
    { key: 'reviewed_at', label: 'Reviewed' },
    { key: 'actions', label: 'Actions' }
]

const filteredApplications = computed(() => {
    let filtered = applications.value

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(app =>
            app.applicant_name.toLowerCase().includes(query) ||
            app.loan_application_id.toLowerCase().includes(query) ||
            app.applicant_id.toLowerCase().includes(query)
        )
    }

    // Filter by status
    if (selectedStatus.value !== 'all') {
        filtered = filtered.filter(app => app.status === selectedStatus.value)
    }

    // Filter by amount range
    if (selectedAmountRange.value !== 'all') {
        const [min, max] = selectedAmountRange.value.split('-').map(v =>
            v.includes('+') ? Infinity : parseInt(v)
        )
        filtered = filtered.filter(app => {
            const amount = parseFloat(app.amount)
            return amount >= min && (max === Infinity || amount <= max)
        })
    }

    return filtered
})

const fetchApplications = async () => {
    if (auth.isAuthenticated && auth.user.memberId) {
        loading.value = true
        try {
            const [appsRes, statsRes] = await Promise.all([
                fetchWithCookies(`${baseUrl}`),
                fetchWithCookies(`${baseUrl}/stats`)
            ])

            applications.value = appsRes
            stats.value = statsRes
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }
}

const viewApplication = (applicationId) => {
    router.push({ name: 'admin-loan-detail', params: { id: applicationId } })
}

const openReviewModal = (application) => {
    selectedApplication.value = application
    showReviewModal.value = true
}

const reviewApplication = async ({ status, comments }) => {
    try {
        await fetchWithCookies(
            `${baseUrl}/${selectedApplication.value.loan_application_id}/review`,
            'PUT',
            { status, comments }
        )

        // Update the application in the list
        const index = applications.value.findIndex(
            app => app.loan_application_id === selectedApplication.value.loan_application_id
        )
        if (index !== -1) {
            applications.value[index].status = status
            applications.value[index].reviewed_at = new Date().toISOString()
        }

        showReviewModal.value = false

        // Refresh stats
        const statsRes = await fetchWithCookies(`${baseUrl}/stats`)
        stats.value = statsRes

    } catch (err) {
        error.value = err.message
    }
}

onMounted(() => {
    fetchApplications()
})
</script>