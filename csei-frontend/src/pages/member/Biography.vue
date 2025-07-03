<template>
    <main class="mt-4 p-4">
        <BiographyRibbon :currentViewIndex="currentViewIndex" :tableViews="tableViews" :onToggleView="toggleView" />

        <div>
           
            <component :is="currentViewComponent" :columns="tableColumns" :rows="tableRows" class="mt-7">
                <template v-if="currentViewIndex === 0" #tableData="{ rows }">
                    <tr v-for="row in rows" :key="row.id">
                        <template v-for="column in tableColumns" :key="column.key">
                            <td class="px-3 py-2 whitespace-nowrap">{{ row[column.key] }}</td>
                        </template>
                    </tr>
                </template>

            </component>
        </div>

        <div class="flex justify-center">
            <BasePagination />
        </div>
    </main>
</template>

<script setup>
import BaseTable from '@/components/base/BaseTable.vue';
import tableConfig from '@/config/tableConfig';
import BasePagination from '@/components/base/BasePagination.vue';
import BiographyRibbon from '@/components/layout/BiographyRibbon.vue';
import { useAuthStore } from '@/stores/UserAuth';
import fetchWithCookies from '@/utils/fetchWrapper';
import { onMounted, ref, computed } from 'vue';
import formatAmount from '@/utils/formatAmount';
import pageConfig from '@/config/pageConfig';
import Tiles from '@/components/layout/Tiles.vue';

const tableColumns = tableConfig.memberTable.columns
//const tableRows = memberData
const error = ref(null)
const baseUrl = `${import.meta.env.VITE_API_URL}/members/`
const loading = ref(true)
const auth = useAuthStore()
const tableRows = ref(null)
const tableViews = pageConfig.biographyTableViews
const currentViewIndex = ref(0)

const toggleView = () => {
    currentViewIndex.value = (currentViewIndex.value + 1) % tableViews.length;
}

const currentViewComponent = computed(() => {
    if(currentViewIndex.value === 0) return BaseTable
    if(currentViewIndex.value === 1) return Tiles
    return BaseTable
})

const fetchAllMembers = async() => {
    if(auth.isAuthenticated){
        loading.value = true
        try{
            const res = await fetchWithCookies(`${baseUrl}`)
            tableRows.value = res.map(member => ({
                memberId: member.member_id,
                memberName: member.member_name,
                firstTelephoneLine: member.first_telephone_line,
                accountBalance: formatAmount(member.balance)
            }))
        } catch(err){
            error.value = err.message
        } finally{
            loading.value = false
        }
    }
}



onMounted(() => {
    fetchAllMembers()
    //console.log(tableRows.value)
})

</script>