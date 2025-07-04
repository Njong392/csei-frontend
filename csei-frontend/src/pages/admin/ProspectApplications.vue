<template>
    <main class="mt-4 p-5">
        <div class="mb-6">
            <h1 class="text-black font-medium text-3xl mb-4">Prospect Applications</h1>

            <!-- Filters and Search -->
            <div class="flex justify-between items-center mb-6">
                <div class="flex gap-4 items-center">
                    <!-- Status Filter -->
                    <select v-model="selectedStatus"
                        class="bg-powder text-sm px-4 py-3 rounded-sm shadow-lg outline-none border border-gray-300">
                        <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                </div>

                <div class="flex gap-4 items-center">
                    <!-- Search Input -->
                    <BaseInput inputType="text" inputPlaceholder="Search prospects..."
                        inputStyle="bg-powder text-sm px-4 py-3 rounded-full shadow-lg outline-none w-80"
                        :inputValue="searchQuery" @update:inputValue="searchQuery = $event" />

                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-red-500 text-center p-4">
            <p>Error loading prospects: {{ error }}</p>
        </div>

        <!-- Prospects Table -->
        <div v-else>
            <BaseTable :columns="tableColumns" :rows="filteredProspects">
                <template #tableData="{ rows }">
                    <tr v-for="prospect in rows" :key="prospect.prospectId" class="hover:bg-gray-50 cursor-pointer">
                        <td class="px-3 py-4 whitespace-nowrap">
                            <div class="font-medium text-deepgray">{{ prospect.prospectName }}</div>
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap text-sm text-lightgray">
                            {{ prospect.email }}
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap text-sm text-lightgray">
                            {{ prospect.firstTelephoneLine }}
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap text-sm">
                            <span class="font-medium">{{ prospect.monthlyCommitment }}</span>
                            <span class="text-xs text-gray"> FCFA</span>
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap">
                            <StatusBadge :status="prospect.prospectStatus" />
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap text-sm text-lightgray">
                            {{ prospect.createdAt }}
                        </td>
                        <td class="px-3 py-4 whitespace-nowrap">
                            <BaseButton buttonType="button"
                                buttonStyle="bg-blue text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer"
                                @click="viewProspect(prospect.prospectId)">
                                <template #buttonLabel>View Details</template>
                            </BaseButton>
                        </td>
                    </tr>
                </template>
            </BaseTable>

            <!-- Empty State -->
            <div v-if="filteredProspects.length === 0" class="text-center py-8">
           
                <p class="text-lg text-lightgray">No prospects found</p>
                <p class="text-sm text-gray">Try adjusting your search or filter criteria</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import BaseTable from '@/components/base/BaseTable.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import StatusBadge from '@/components/layout/StatusBadge.vue';
import { ref, computed, onMounted } from 'vue';
import tableConfig from '@/config/tableConfig';
import { useAuthStore } from '@/stores/UserAuth';
import fetchWithCookies from '@/utils/fetchWrapper';
import formatAmount from '@/utils/formatAmount';
import formatDate from '@/utils/formatDate';
import { useRouter } from 'vue-router';

const prospects = ref(null)
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const selectedStatus = ref('all');
const tableColumns = tableConfig.prospectApplications.columns
const statusOptions = tableConfig.prospectApplications.statusOptions
const baseUrl = `${import.meta.env.VITE_API_URL}/prospects`;
const auth = useAuthStore();
const router = useRouter();


const filteredProspects = computed(() => {
    let filtered = prospects.value;

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(prospect =>
            prospect.prospectName.toLowerCase().includes(query) ||
            prospect.email.toLowerCase().includes(query)
        );
    }

    // Filter by status
    if (selectedStatus.value !== 'all') {
        filtered = filtered.filter(prospect =>
            prospect.prospectStatus === selectedStatus.value
        );
    }

    return filtered;
});

const viewProspect = (prospectId) => {
    // Navigate to prospect detail view
    router.push({ name: 'prospect-detail', params: { id: prospectId } });
};

const fetchMemberTransactions = async () => {
    if (auth.isAuthenticated && auth.user.memberId) {
        loading.value = true
        try {
            const res = await fetchWithCookies(`${baseUrl}`)
            prospects.value = res.map(prospect => ({
                prospectName: prospect.prospect_name,
                email: prospect.email,
                firstTelephoneLine: prospect.first_telephone_line,
                monthlyCommitment: formatAmount(prospect.monthly_commitment),
                prospectStatus: prospect.prospect_status,
                createdAt: formatDate(prospect.submitted_at),
                prospectId: prospect.id
            }))
            //console.log(memberTransaction.value)
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

}

onMounted(() => {
    fetchMemberTransactions();
});



</script>