<template>
    <main class="mt-4 p-4">
        <BiographyRibbon />

        <BaseTable :columns="tableColumns" :rows="tableRows" class="mt-4">
            <template #tableData="{ rows }">
                <tr v-for="row in rows" :key="row.id">
                    <template v-for="column in tableColumns" :key="column.key">
                        <td class="px-3 py-2 whitespace-nowrap">
                            {{ row[column.key] }}
                        </td>
                    </template>
                </tr>
            </template>
        </BaseTable>

        <div class="flex justify-center">
            <BasePagination />
        </div>
    </main>
</template>

<script setup>
import BaseTable from '@/components/base/BaseTable.vue';
import memberData from '@/config/memberData'
import tableConfig from '@/config/tableConfig';
import BasePagination from '@/components/base/BasePagination.vue';
import BiographyRibbon from '@/components/layout/BiographyRibbon.vue';

const tableColumns = tableConfig.memberTable.columns
const tableRows = memberData
</script>