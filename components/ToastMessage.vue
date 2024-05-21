<script setup>
import ConfirmIcon from '@/components/Icons/ConfirmIcon.vue'
</script>

<template>
        <div class="fixed z-50 bottom-4 right-4">
            <div
                class="flex items-center w-full max-w-xs p-4 space-x-3 text-red-700 bg-white divide-x divide-black rounded-lg shadow-xl space-x">
                <ConfirmIcon />
                <div class="pl-4 text-sm font-bold text-red-700">
                    <p>
                        <slot />
                    </p>
                </div>
            </div>
        </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>