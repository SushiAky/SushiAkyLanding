<script setup>
import CartIcon from '@/components/Icons/CartIcon.vue'
import DescriptionIcon from '@/components/Icons/DescriptionIcon.vue'
import CloseIcon from '@/components/Icons/CloseIcon.vue'
import { ref, defineProps } from 'vue'
import { useCartStore } from '../stores/cart.js';

const props = defineProps(['location', 'title', 'menus'])

const cartStore = useCartStore()

const addProduct = ref(false)

const products = props.menus.map(menu => ({
    ...menu,
    showDescription: ref(false)
}))

const addToCart = (product) => {
    product.showDescription = false;

    addProduct.value = true
    setTimeout(() => addProduct.value = false, 2500)

    cartStore.addToCart(product)
}
</script>

<template>
    <a :id="location" />
    <div class="pb-14 lg:pb-24">
        <div class="my-4 ml-6 text-left">
            <p class="text-xl font-bold text-black lg:text-3xl text-transparent bg-clip-text bg-contain bg-text-title">
                {{ title }}
            </p>
        </div>

        <div class="mx-3">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-2 lg:gap-x-4 gap-y-8">

                <div v-for="menu in menus" :key="menu.id"
                    class="relative flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow h-56 lg:h-64">
                    <div class="flex flex-col justify-between p-4 leading-normal w-7/12"
                        :class="{ 'w-7/12': menu.image, 'w-full': !menu.image }">
                        <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 lg:text-xl">{{ menu.name }}
                        </h5>
                        <p class="text-gray-600 text-sm truncate">{{ menu.description }}</p>
                        <p class="mb-3 font-normal text-right text-red-700 lg:text-lg">R${{ menu.price }}</p>
                        <div>
                            <button @click="addToCart(menu)"
                                class="flex items-center justify-center w-full gap-2 rounded-md bg-black px-5 py-2.5 text-center text-sm lg:font-medium text-white">
                                <CartIcon />
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>

                    <div v-if="menu.image" class="relative w-5/12">
                        <img @click="menu.showDescription = true"
                            class="object-cover w-full rounded-none rounded-r-lg h-56 lg:h-64" :src="menu.image">
                        <span :title="menu.description" @click="menu.showDescription = true"
                            class="absolute top-0 right-0 m-2 text-sm font-medium text-center text-white rounded-full">
                            <DescriptionIcon />
                        </span>
                    </div>

                    <Transition>
                        <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
                            v-show="menu.showDescription">
                            <div class="relative w-4/5 lg:mx-auto lg:w-2/5">
                                <div class="w-full pt-8 pb-10 bg-white rounded-md lg:pr-8 lg:pl-9">
                                    <div class="flex justify-end">
                                        <button class="mr-5 lg:mr-5" @click="menu.showDescription = false">
                                            <CloseIcon />
                                        </button>
                                    </div>

                                    <div class="mx-4 mt-3 lg:mx-10">
                                        <div class="text-center">
                                            <p class="text-lg text-black font-bold lg:text-xl">{{ menu.name }}</p>
                                        </div>

                                        <div class="mt-4">
                                            <img class="object-cover w-full rounded-lg" :src="menu.image"
                                                :alt="menu.name" />
                                        </div>

                                        <div class="mt-5">
                                            <p class="text-gray-600">{{ menu.description }}</p>
                                        </div>
                                    </div>

                                    <div class="flex flex-row-reverse mt-10 mr-5">
                                        <button type="submit" @click="addToCart(menu)"
                                            class="py-2 ml-5 text-base tracking-tighter text-white bg-black rounded-full px-7">
                                            Adicionar
                                        </button>
                                        <button @click="menu.showDescription = false"
                                            class="py-2 text-base tracking-tighter text-black bg-white border border-black rounded-full px-7">
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <div v-show="menu.showDescription" class="fixed inset-0 z-40 bg-black opacity-75"></div>
                </div>

            </div>
        </div>

        <Transition>
        <div v-show="addProduct">
            <div class="fixed z-50 bottom-4 right-20 lg:right-4">
                <div
                    class="flex items-center w-full max-w-xs p-4 space-x-3 text-red-700 bg-white divide-x divide-black rounded-lg shadow-xl space-x">
                    <IconsConfirmIcon />
                    <div class="pl-4 text-sm font-bold text-red-700">
                        <p>
                            Adicionado ao Carrinho!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
    </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>