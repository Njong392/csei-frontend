<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-deepgray">Update Application Status</h3>
                <button @click="closeModal" class="text-gray hover:text-deepgray">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="mb-4">
                <p class="text-sm text-lightgray mb-2">Updating status for: <strong>{{ prospectName }}</strong></p>
            </div>

            <form @submit.prevent="handleSumbit">
                <!-- Status Selection -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-deepgray mb-2">New Status</label>
                    <div class="space-y-2">
                        <div v-for="option in statusOptions.slice(1,5)" :key="option.value"
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
                        Comment <span class="text-red-500">*</span>
                    </label>
                    <textarea v-model="comment" placeholder="Provide a comment for this status change..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                        rows="4" required></textarea>
                    <p class="text-xs text-lightgray mt-1">This comment will be included in the email notification sent
                        to the prospect.</p>
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
                        :disabled="isSubmitting || !comment.trim()">
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
</template>

<script setup>
import { computed, ref } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import tableConfig from '@/config/tableConfig';

const props = defineProps({
    isOpen: Boolean,
    currentStatus: String,
    prospectName: String
})

const emit = defineEmits(['close', 'update']);

const selectedStatus = ref(props.currentStatus)
const comment = ref('')
const isSubmitting = ref(false)
const statusOptions = tableConfig.prospectApplications.statusOptions
const error = ref('')

const handleSumbit = async () => {
    try{
        emit('update', {
            status: selectedStatus.value,
            comment: comment.value.trim()
        });
        comment.value = ''
    } finally{
        isSubmitting.value = false
    }
}

const closeModal = () => {
    comment.value = ''
    selectedStatus.value = props.currentStatus
    emit('close');
}




</script>