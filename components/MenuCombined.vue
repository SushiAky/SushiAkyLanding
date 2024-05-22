<script setup>
import CartIcon from '@/components/Icons/CartIcon.vue';
import DescriptionIcon from './Icons/DescriptionIcon.vue';
import CloseIcon from './Icons/CloseIcon.vue';
import { ref } from 'vue';

const props = defineProps(['title', 'menus'])

const addProduct = ref(false)

const products = props.menus.map(menu => ({
    ...menu,
    showDescriptionCombined: ref(false),
    modalSet: ref(false)
}))

const addToCart = (menu) => {
    menu.modalSet = false
    addProduct.value = true
    setTimeout(() => addProduct.value = false, 2500)
}

const setOptions = (menu) => {
    menu.showDescriptionCombined = false
    menu.modalSet = true
}
</script>

<template>
    <section class="pb-14 lg:pb-24">
        <div class="my-4 ml-6 text-left">
            <h2 class="text-xl font-bold text-black lg:text-3xl">
                {{ title }}</h2>
        </div>

        <div class="mx-3">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-2 lg:gap-x-4 gap-y-8">

                <div v-for="product in menus" :key="product.id"
                    class="relative flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow h-56 lg:h-64">
                    <div class="flex flex-col justify-between p-4 leading-normal w-7/12"
                        :class="{ 'w-7/12': product.image, 'w-full': !product.image }">
                        <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 lg:text-xl">{{ product.name }}
                        </h5>
                        <p class="text-gray-600 text-sm truncate">{{ product.description }}</p>
                        <p class="mb-3 font-normal text-right text-red-700 lg:text-lg">R${{ product.price }}</p>
                        <div>
                            <button @click="product.modalSet = true"
                                class="flex items-center justify-center w-full gap-2 rounded-md bg-black px-5 py-2.5 text-center text-sm lg:font-medium text-white">
                                <CartIcon />
                                Montar
                            </button>
                        </div>
                    </div>

                    <div v-if="product.image" class="relative w-5/12">
                        <img @click="product.showDescription = true"
                            class="object-cover w-full rounded-none rounded-r-lg h-56 lg:h-64" :src="product.image">
                        <span :title="product.description" @click="product.showDescription = true"
                            class="absolute top-0 right-0 m-2 text-sm font-medium text-center text-white rounded-full">
                            <DescriptionIcon />
                        </span>
                    </div>

                    <Transition>
                        <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
                            v-show="product.modalSet">
                            <ModalCombined :product="product" :quantity="product.quantity"
                                @close-modal="product.modalSet = false" @add-product="addToCart(product)" />
                        </div>
                    </Transition>
                    <div v-show="product.modalSet" class="fixed inset-0 z-40 bg-black opacity-75"></div>

                    <Transition>
                        <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
                            v-show="product.showDescriptionCombined">
                            <div class="relative w-4/5 lg:mx-auto lg:w-2/5">
                                <div class="w-full pt-8 pb-10 bg-white rounded-md lg:pr-8 lg:pl-9">
                                    <div class="flex justify-end">
                                        <button class="mr-5 lg:mr-5" @click="product.showDescriptionCombined = false">
                                            <CloseIcon />
                                        </button>
                                    </div>

                                    <div class="mx-4 mt-3 lg:mx-10">
                                        <div class="text-center">
                                            <p class="text-black font-bold text-lg lg:text-xl">{{ product.name }}</p>
                                        </div>

                                        <div class="mt-4">
                                            <img class="object-cover w-full rounded-lg" :src="product.image"
                                                :alt="product.name" />
                                        </div>

                                        <div class="mt-5">
                                            <p class="text-gray-600">{{ product.description }}</p>
                                        </div>
                                    </div>

                                    <div class="flex flex-row-reverse mt-10 mr-5">
                                        <button type="submit" @click="setOptions(product)"
                                            class="py-2 ml-5 text-base tracking-tighter text-white bg-black rounded-full px-7">
                                            Montar
                                        </button>
                                        <button @click="product.showDescriptionCombined = false"
                                            class="py-2 text-base tracking-tighter text-black bg-white border border-black rounded-full px-7">
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                    <div v-show="product.showDescriptionCombined" class="fixed inset-0 z-40 bg-black opacity-75"></div>
                </div>
            </div>
        </div>

        <Transition>
            <div v-show="addProduct" class="fixed bottom-4 right-4 z-50">
                <div
                    class="flex items-center w-full max-w-xs p-4 space-x-3 text-red-700 bg-white divide-x divide-black rounded-lg shadow-xl space-x">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <div class="pl-4 text-sm font-bold text-red-700">
                        <p>Adicionado ao Carrinho!</p>
                    </div>
                </div>
            </div>
        </Transition>
    </section>
</template>