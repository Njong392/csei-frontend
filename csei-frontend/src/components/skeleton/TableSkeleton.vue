<template>
    <BaseTable :columns="tableColumns" :rows="tableRows">
        <template #tableData="{ rows}">
            <tr v-for="row in rows" :key="row.key">
                <template v-for="column in tableColumns">
                    <td class="py-2 px-3">
                        <span class="block bg-gray-200 rounded h-5 w-full mx-auto animate-pulse"></span>
                    </td>
                </template>
            </tr>
        </template>
    </BaseTable>

</template>

<script setup>
import BaseTable from '../base/BaseTable.vue';
import tableConfig from '@/config/tableConfig';
import transactionData from '@/config/transactionData.json';

const tableColumns = tableConfig.transactionTable.columns.slice(0, 4); // Limit to first 4 columns for skeleton
const tableRows = transactionData
</script>