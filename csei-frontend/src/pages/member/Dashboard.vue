<template>

    <main class="p-7">
        <!--Account Summary-->
        <section class="mb-14">
            <h1 class="text-black font-medium text-3xl mb-4">Account Summary</h1>
            <div class="flex gap-5">
                <Card cardContent="-2,100,000" cardLabel="Account Balance" bgColor="bg-gray" textColor="text-white" />
                <Card cardContent="1,500,000" cardLabel="Loan Total" bgColor="bg-blue" textColor="text-black" />
                <Card cardContent="500,000" cardLabel="Loan Balance" bgColor="bg-black" textColor="text-white" />
            </div>
        </section>

        <!--Transactions table-->
        <section>
            <h1 class="text-black font-medium text-3xl mb-4">Recent Transactions</h1>

            <Table :columns="tableColumns" :rows="tableRows">
                <template #tableData="{rows}">
                    <tr v-for="row in rows" :key="row.id">
                        <template v-for="column in tableColumns" :key="column.key">
                            <td class="px-3 py-2 whitespace-nowrap">{{ row[column.key] }}</td>
                        </template>
                    </tr>
                </template>

            </Table>
        </section>

    </main>
</template>

<script setup>
import Card from '@/components/base/Card.vue';
import Table from '@/components/base/Table.vue';
import tableConfig from '@/config/tableConfig';
import sampleData from '@/config/sampleData.json';

const tableColumns = tableConfig.transactionTable.columns
const tableRows = sampleData


</script>