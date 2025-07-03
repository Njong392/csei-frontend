<template>
    <div class="overflow-x-auto overflow-auto max-h-screen min-h-[300px]">
        <table class="min-w-full divide-y-2 divide-gray-200">
            <thead class="ltr:text-left rtl:text-right">
                <tr>
                    <template v-for="column in columns" key="column.key">
                        <th class="px-3 py-2 whitespace-nowrap font-semibold text-lg sticky top-0 z-10 bg-white">{{
                            column.label }}</th>
                    </template>

                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                <slot name="tableData" :rows="rows" />
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    columns: Array,
    rows: Array
})
</script>