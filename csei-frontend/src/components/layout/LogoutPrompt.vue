<template>
    <div class="absolute bottom-5 left-11 mt-2 bg-white rounded shadow-lg p-4 z-50 w-56 text-sm">
        <div class="mb-3 text-gray-800">Are you sure you want to logout?</div>
        <div class="flex justify-end gap-2">
            <button @click="$emit('close')"
                class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer">Cancel</button>
            <button @click="$emit('confirm')"
                class="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer">Logout</button>
        </div>
    </div>
</template>