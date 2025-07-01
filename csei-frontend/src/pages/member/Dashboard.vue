<template>

    <main class="p-7">
        <!--Account Summary-->
        <section class="mb-14">
            <h1 class="text-black font-medium text-3xl mb-4">Account Summary</h1>
            <div class="flex gap-5">
                <Card :cardContent="memberData.member.balance" cardLabel="Account Balance" bgColor="bg-gray" textColor="text-white" />
                <Card cardContent="0" cardLabel="Loan Total" bgColor="bg-blue" textColor="text-black" />
                <Card cardContent="0" cardLabel="Loan Balance" bgColor="bg-black" textColor="text-white" />
            </div>
        </section>

        <section>
            <h1 class="text-black font-medium text-3xl mb-4">Recent Transactions</h1>

            <!--Skeleton screen for laoding-->
            <div v-if="loading">
                <TableSkeleton />
            </div>

            <!--Table section-->
            <div v-else>
                <div v-if="memberTransaction && memberTransaction[0] && !memberTransaction[0]['Document No']">
                    <p class="text-lg flex items-center justify-center">
                        No transactions for this member yet
                    </p>
                </div>

                <div v-else>
                    <Ribbon />

                    <!--Transactions table-->
                    <BaseTable :columns="tableColumns" :rows="memberTransaction">
                        <template #tableData="{ rows }">
                            <tr v-for="row in rows" :key="row.key">
                                <template v-for="column in tableColumns" :key="column.key">
                                    <td class="px-3 py-2 whitespace-nowrap">{{ row[column.key] }}</td>
                                </template>
                            </tr>
                        </template>

                    </BaseTable>
                </div>
            </div>
        </section>

    </main>
</template>

<script setup>
import Card from '@/components/base/BaseCard.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import tableConfig from '@/config/tableConfig';
import Ribbon from '@/components/layout/TransactionRibbon.vue';
import fetchWithCookies from '../../utils/fetchWrapper';
import { useAuthStore } from '@/stores/UserAuth';
import { useMemberStore } from '@/stores/MemberData';
import { onMounted, ref } from 'vue';
import TableSkeleton from '@/components/skeleton/TableSkeleton.vue';

const tableColumns = tableConfig.transactionTable.columns
const memberTransaction = ref(null)
const memberData = useMemberStore()
const error = ref(null)
const baseUrl = `${import.meta.env.VITE_API_URL}/members`;
const auth = useAuthStore()
const loading = ref(true)

const fetchMemberTransactions = async() => {
        if(auth.isAuthenticated && auth.user.memberId){
            loading.value = true
            try {
                const res = await fetchWithCookies(`${baseUrl}/transaction-summary/${auth.user.memberId}`)
                memberTransaction.value = res
                //console.log(memberTransaction.value)
            } catch (err) {
                error.value = err.message
            } finally {
                loading.value = false
            }
        }
    
}

onMounted(() => {
    fetchMemberTransactions()
})


</script>