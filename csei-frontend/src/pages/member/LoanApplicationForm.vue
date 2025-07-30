<template>
    <div class="max-w-4xl mx-auto p-6">
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-deepgray mb-2">Apply for a Loan</h1>
            <p class="text-lightgray">Complete the form below to submit your loan application</p>
        </div>

        <!-- Success Message -->
        <div v-if="isSuccess" class="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <div class="flex items-center">
                <i class="fas fa-check-circle text-green-400 mr-2"></i>
                <div>
                    <p class="text-green-800 font-medium">Loan application submitted successfully!</p>
                    <p class="text-green-700 text-sm">Application ID: {{ applicationId }}</p>
                    <p class="text-green-700 text-sm">You will receive an email confirmation shortly.</p>
                </div>
            </div>
        </div>

        <form @submit="handleSubmit" class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Loan Details Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray">Loan Details</h2>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Loan Amount -->
                        <div>
                            <label class="block text-sm font-medium text-deepgray mb-2">
                                Loan Amount <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <BaseInput inputType="number" inputPlaceholder="Enter loan amount"
                                    inputStyle="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                                    v-model:inputValue="form.amount" @input="clearError" />
                                <span class="absolute right-3 top-2 text-sm text-gray-500">FCFA</span>
                            </div>
                        </div>

                        <!-- Loan Duration -->
                        <div>
                            <label class="block text-sm font-medium text-deepgray mb-2">
                                Duration <span class="text-red-500">*</span>
                            </label>
                            <select v-model="form.duration"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                                @change="clearError">
                                <option value="">Select duration</option>
                                <option value="6">6 months</option>
                                <option value="12">12 months</option>
                                <option value="18">18 months</option>
                                <option value="24">24 months</option>
                                <option value="36">36 months</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Engagement Letter Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray">Engagement Letter</h2>
                </div>
                <div class="p-6">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-deepgray mb-2">
                            Upload Engagement Letter <span class="text-red-500">*</span>
                        </label>
                        <p class="text-sm text-lightgray mb-3">
                            Upload a document outlining your loan purpose and repayment plan
                        </p>

                        <!-- File Upload Area -->
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue transition-colors cursor-pointer"
                            :class="{ 'border-blue bg-blue-50': dragOver }" @click="triggerFileInput"
                            @dragover.prevent="dragOver = true" @dragleave="dragOver = false"
                            @drop.prevent="handleFileDrop">
                            <input ref="fileInput" type="file" accept=".pdf,.doc,.docx" @change="handleFileSelect"
                                class="hidden" />

                            <div v-if="!selectedFile">
                                
                                <p class="text-lg font-medium text-deepgray">Drop your file here or click to browse</p>
                                <p class="text-sm text-lightgray">PDF, DOC, DOCX up to 10MB</p>
                            </div>

                            <div v-else class="flex items-center justify-center gap-3">
                                
                                <div>
                                    <p class="font-medium text-deepgray">{{ selectedFile.name }}</p>
                                    <p class="text-sm text-lightgray">{{ formatFileSize(selectedFile.size) }}</p>
                                </div>
                                <button type="button" @click.stop="removeFile" class="text-red-500 hover:text-red-700 text-xs">
                                    Remove
                                </button>
                            </div>
                        </div>

                        <!-- Upload Progress -->
                        <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-3">
                            <div class="flex justify-between text-sm text-lightgray mb-1">
                                <span>Uploading...</span>
                                <span>{{ uploadProgress }}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue h-2 rounded-full transition-all duration-300"
                                    :style="{ width: uploadProgress + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Guarantors Section -->
            <div class="border-b border-gray-200">
                <div class="px-6 py-4 bg-gray-50">
                    <h2 class="text-xl font-semibold text-deepgray">Guarantors (Optional)</h2>
                </div>
                <div class="p-6">
                    <p class="text-sm text-lightgray mb-4">
                        Add members who can guarantee your loan application
                    </p>

                    <div v-for="(guarantor, index) in form.guarantors" :key="index"
                        class="mb-4 p-4 border border-gray-200 rounded-lg">
                        <div class="flex justify-between items-center mb-3">
                            <h4 class="font-medium text-deepgray">Guarantor {{ index + 1 }}</h4>
                            <button type="button" @click="removeGuarantor(index)"
                                class="text-red-500 hover:text-red-700">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-deepgray mb-1">Member ID</label>
                                <BaseInput inputType="text" inputPlaceholder="Enter member ID"
                                    inputStyle="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                                    v-model:inputValue="guarantor.guarantor_id" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-deepgray mb-1">Committed Amount</label>
                                <div class="relative">
                                    <BaseInput inputType="number" inputPlaceholder="Enter amount"
                                        inputStyle="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                                        v-model:inputValue="guarantor.committed_amount" />
                                    <span class="absolute right-3 top-2 text-sm text-gray-500">FCFA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <BaseButton buttonType="button"
                        buttonStyle="px-4 py-2 border border-blue text-blue rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                        @click="addGuarantor">
                        <template #buttonLabel>
                            <i class="fas fa-plus mr-2"></i>Add Guarantor
                        </template>
                    </BaseButton>
                </div>
            </div>

            <!-- Error Display -->
            <div v-if="error" class="p-6 bg-red-50 border-t border-red-200">
                <p class="text-red-800">{{ error }}</p>
            </div>

            <!-- Submit Section -->
            <div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                <BaseButton buttonType="button"
                    buttonStyle="px-4 py-2 border border-gray-300 rounded-md text-deepgray hover:bg-gray-50 transition-colors cursor-pointer"
                    @click="resetForm">
                    <template #buttonLabel>Reset Form</template>
                </BaseButton>

                <BaseButton buttonType="submit"
                    buttonStyle="bg-blue text-white px-6 py-2 rounded-md hover:bg-gray transition-colors cursor-pointer disabled:opacity-50"
                    :disabled="isLoading">
                    <template #buttonLabel>
                        <span v-if="isLoading">
                            <i class="fas fa-spinner fa-spin mr-2"></i>Submitting...
                        </span>
                        <span v-else>Submit Application</span>
                    </template>
                </BaseButton>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import fetchWithCookies from '@/utils/fetchWrapper'
import checkRequiredFields from '@/utils/validation'
import { uploadFileWithProgress, validateFile, formatFileSize } from '@/utils/fileUpload'



const baseUrl = `${import.meta.env.VITE_API_URL}/loans`
const uploadUrl = `${import.meta.env.VITE_API_URL}/loans/upload-engagement-letter`

const form = ref({
    amount: '',
    duration: '',
    engagement_letter: '',
    guarantors: []
})

const selectedFile = ref(null)
const uploadProgress = ref(0)
const dragOver = ref(false)
const isLoading = ref(false)
const isSuccess = ref(false)
const applicationId = ref('')
const error = ref('')
const fileInput = ref(null)

const clearError = () => {
    error.value = ''
}

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
        validateAndSetFile(file)
    }
}

const handleFileDrop = (event) => {
    dragOver.value = false
    const file = event.dataTransfer.files[0]
    if (file) {
        validateAndSetFile(file)
    }
}

const validateAndSetFile = (file) => {
    const validation = validateFile(file)

    if (!validation.isValid) {
        error.value = validation.error
        return
    }

    selectedFile.value = file
    clearError()
}

const removeFile = () => {
    selectedFile.value = null
    form.value.engagement_letter = ''
    uploadProgress.value = 0
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const addGuarantor = () => {
    form.value.guarantors.push({
        guarantor_id: '',
        committed_amount: ''
    })
}

const removeGuarantor = (index) => {
    form.value.guarantors.splice(index, 1)
}

const uploadFileToS3 = async (file) => {
    try {
        const fileUrl = await uploadFileWithProgress(
            file,
            (progress) => {
                uploadProgress.value = progress
            },
            uploadUrl
        )
        return fileUrl
    } catch (uploadError) {
        throw new Error(`File upload failed: ${uploadError.message}`)
    }
}

const resetForm = () => {
    form.value = {
        amount: '',
        duration: '',
        engagement_letter: '',
        guarantors: []
    }
    selectedFile.value = null
    uploadProgress.value = 0
    error.value = ''
    isSuccess.value = false
    applicationId.value = ''
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const handleSubmit = async (event) => {
    event.preventDefault()
    isLoading.value = true
    error.value = ''

    try {
        // Validate required fields
        const requiredFields = ['amount', 'duration']
        const missing = checkRequiredFields(form.value, requiredFields)

        if (missing.length > 0) {
            error.value = 'Please fill in all required fields'
            return
        }

        if (!selectedFile.value) {
            error.value = 'Please upload an engagement letter'
            return
        }

        // Upload file to S3 first
        const engagementLetterUrl = await uploadFileToS3(selectedFile.value)
        form.value.engagement_letter = engagementLetterUrl

        // Submit loan application
        const response = await fetchWithCookies(baseUrl, 'POST', {
            ...form.value,
            amount: parseFloat(form.value.amount),
            duration: parseInt(form.value.duration),
            guarantors: form.value.guarantors.filter(g => g.guarantor_id && g.committed_amount)
        })

        isSuccess.value = true
        applicationId.value = response.applicationId

        // Reset form after successful submission
        setTimeout(() => {
            resetForm()
        }, 5000)

    } catch (err) {
        error.value = err.message
        // Reset upload progress on error
        uploadProgress.value = 0
    } finally {
        isLoading.value = false
    }
}
</script>