<script setup>
import { useCartStore } from '../stores/cart.js';
import { ref, defineProps } from 'vue'

const props = defineProps(['menus'])

const cartStore = useCartStore()

const addProduct = ref(false)

const addToCart = (product) => {
    product.showDescription = false;

    addProduct.value = true
    setTimeout(() => addProduct.value = false, 2500)

    cartStore.addToCart(product)
}
</script>

<template>
    <div v-for="menu in menus" class="flex flex-col gap-5 lg:gap-8 mx-4">

        <div class="">
            <img class="object-cover w-full rounded-lg" :src="menu.image" alt="">
        </div>

        <div class="mx-4">
            <p class="text-3xl text-center">{{ menu.name }}</p>

            <p class="mt-4 text-left text-gray-500">{{ menu.description }}
            </p>

            <div class="flex justify-end mt-4">
                <p class="text-xl font-bold text-red-700 lg:text-3xl">R$ {{ menu.price }} </p>
            </div>

            <div class="mt-4">
                <button @click="addToCart(menu)" class="px-5 py-2.5 bg-black rounded-full text-white">
                    Adicionar
                </button>
            </div>
        </div>
    </div>

    <Transition>
        <div v-show="addProduct">
            <div class="fixed z-50 bottom-4 right-4">
                <div
                    class="flex items-center w-full max-w-xs p-4 space-x-3 text-red-700 bg-white divide-x divide-black rounded-lg shadow-xl space-x">
                    <ConfirmIcon />
                    <div class="pl-4 text-sm font-bold text-red-700">
                        <p>
                            Adicionado ao Carrinho!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>