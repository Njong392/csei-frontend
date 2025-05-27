<template>
    <ul class="flex gap-2 text-gray-900">
        <li>
            <div class="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 cursor-pointer"
                aria-label="Previous page">

                <font-awesome-icon icon="fa-solid fa-caret-left" class="text-gray" />
            </div>
        </li>

        <li class="text-sm/8 font-medium tracking-widest text-gray">2/12</li>

        <li>
            <div class="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 cursor-pointer"
                aria-label="Next page">
                <font-awesome-icon icon="fa-solid fa-caret-right" class="text-gray"/>
            </div>
        </li>
    </ul>
</template>