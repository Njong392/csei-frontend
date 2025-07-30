<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-deepgray">Review Loan Application</h3>
                <button @click="closeModal" class="text-gray hover:text-deepgray">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div v-if="application" class="mb-6">
                <!-- Application Summary -->
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 class="font-medium text-deepgray mb-3">Application Summary</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="text-lightgray">Application ID:</span>
                            <span class="ml-2 font-medium">{{ application.loan_application_id }}</span>
                        </div>
                        <div>
                            <span class="text-lightgray">Applicant:</span>
                            <span class="ml-2 font-medium">{{ application.applicant_name }}</span>
                        </div>
                        <div>
                            <span class="text-lightgray">Amount:</span>
                            <span class="ml-2 font-medium">{{ formatAmount(application.amount) }} FCFA</span>
                        </div>
                        <div>
                            <span class="text-lightgray">Duration:</span>
                            <span class="ml-2 font-medium">{{ application.duration }} months</span>
                        </div>
                        <div>
                            <span class="text-lightgray">Current Status:</span>
                            <StatusBadge :status="application.status" class="ml-2" />
                        </div>
                        <div>
                            <span class="text-lightgray">Submitted:</span>
                            <span class="ml-2 font-medium">{{ formatDate(application.submitted_at) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Engagement Letter -->
                <div v-if="application.engagement_letter" class="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 class="font-medium text-deepgray mb-2">Engagement Letter</h4>
                    <div class="flex items-center gap-3">
                        <i class="fas fa-file-pdf text-red-500 text-xl"></i>
                        <div class="flex-1">
                            <p class="text-sm text-deepgray">Engagement letter document</p>
                            <button @click="viewEngagementLetter"
                                class="text-blue hover:text-blue-600 text-sm underline">
                                View Document
                            </button>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="handleSubmit">
                    <!-- Status Selection -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-deepgray mb-2">New Status</label>
                        <div class="space-y-2">
                            <div v-for="option in statusOptions" :key="option.value"
                                class="flex items-center p-3 border rounded-lg cursor-pointer transition-colors"
                                :class="selectedStatus === option.value ? 'border-blue bg-blue-50' : 'border-gray-200 hover:bg-gray-50'"
                                @click="selectedStatus = option.value">
                                <input type="radio" :value="option.value" v-model="selectedStatus"
                                    class="mr-3 text-blue focus:ring-blue">
                                <div class="flex-1">
                                    <div class="font-medium text-deepgray">{{ option.label }}</div>
                                    <div class="text-xs text-lightgray">{{ option.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Comment Section -->
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-deepgray mb-2">
                            Review Comments <span class="text-red-500">*</span>
                        </label>
                        <textarea v-model="comments" placeholder="Provide detailed comments about your decision..."
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                            rows="4" required></textarea>
                        <p class="text-xs text-lightgray mt-1">
                            These comments will be included in the email notification sent to the applicant.
                        </p>
                        <p class="text-red-500 text-xs">{{ error }}</p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-3 justify-end">
                        <BaseButton buttonType="button"
                            buttonStyle="px-4 py-2 border border-gray-300 rounded-md text-deepgray hover:bg-gray-50 transition-colors cursor-pointer"
                            @click="closeModal">
                            <template #buttonLabel>Cancel</template>
                        </BaseButton>

                        <BaseButton buttonType="submit"
                            buttonStyle="px-4 py-2 bg-blue text-white rounded-md hover:bg-gray transition-colors cursor-pointer disabled:opacity-50"
                            :disabled="isSubmitting || !comments.trim() || !selectedStatus">
                            <template #buttonLabel>
                                <span v-if="isSubmitting">
                                    <i class="fas fa-spinner fa-spin mr-2"></i>Updating...
                                </span>
                                <span v-else>Update Status</span>
                            </template>
                        </BaseButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import StatusBadge from '@/components/layout/StatusBadge.vue'
import formatAmount from '@/utils/formatAmount'
import formatDate from '@/utils/formatDate'

const props = defineProps({
    isOpen: Boolean,
    application: Object
})

const emit = defineEmits(['close', 'update'])

const selectedStatus = ref('')
const comments = ref('')
const isSubmitting = ref(false)
const error = ref('')

const statusOptions = [
    {
        value: 'under_review',
        label: 'Under Review',
        description: 'Application is being reviewed by the team'
    },
    {
        value: 'approved',
        label: 'Approved',
        description: 'Loan application is approved for processing'
    },
    {
        value: 'rejected',
        label: 'Rejected',
        description: 'Loan application does not meet criteria'
    },
    {
        value: 'requires_more_info',
        label: 'Requires More Information',
        description: 'Additional documentation or information needed'
    }
]

const handleSubmit = async () => {
    if (!selectedStatus.value || !comments.value.trim()) {
        error.value = 'Please select a status and provide comments'
        return
    }

    isSubmitting.value = true
    error.value = ''

    try {
        emit('update', {
            status: selectedStatus.value,
            comments: comments.value.trim()
        })

        // Reset form
        comments.value = ''
        selectedStatus.value = ''
    } finally {
        isSubmitting.value = false
    }
}

const closeModal = () => {
    comments.value = ''
    selectedStatus.value = ''
    error.value = ''
    emit('close')
}

const viewEngagementLetter = () => {
    if (props.application?.engagement_letter_url) {
        window.open(props.application.engagement_letter_url, '_blank')
    }
}



// Reset form when modal opens with new application
watch(() => props.application, (newApp) => {
    if (newApp) {
        selectedStatus.value = newApp.status
        comments.value = ''
        error.value = ''
    }
})
</script>