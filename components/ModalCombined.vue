<script setup>
import CloseIcon from './Icons/CloseIcon.vue';
import MinusIcon from './Icons/MinusIcon.vue'
import PlusIcon from './Icons/PlusIcon.vue'
import { ref, watchEffect } from 'vue';
import { useCartStore } from '../stores/cart.js';
import { useMenuStore } from '../stores/menu.js';

const props = defineProps(['product', 'quantity'])

const emits = defineEmits(['closeModal', 'addProduct'])

const cartStore = useCartStore()
const menuStore = useMenuStore();

const totalQuantity = ref(0);

const selectedOptions = ref([]);

const totalPrice = ref(parseFloat(props.product.price))

const addToCart = (product) => {
    if (totalQuantity.value >= props.quantity / 5) {
        const selectedOptionsText = selectedOptions.value.map(option => `${option.quantity} ${option.name}`).join(', ');
        const nameProduct = `${props.product.quantity} Peças Fortal | (${selectedOptionsText})`;

        totalPrice.value = parseFloat(props.product.price)

        const totalOptionsPrice = selectedOptions.value.reduce((acc, option) => {
            const optionPrice = option.price !== "0.00" ? parseFloat(option.price) * option.quantity : parseFloat(option.price);
            return acc + optionPrice;
        }, 0);

        const totalProductPrice = parseFloat(props.product.price) + totalOptionsPrice;

        const productToAdd = {
            name: nameProduct,
            price: totalProductPrice.toFixed(2),
        };

        cartStore.addToCart(productToAdd)

        emits('addProduct')

        selectedOptions.value = []
    }
}

const closeModal = () => {
    emits('closeModal')
}

const increment = (option) => {
    if (getCount(option) < props.quantity / 5 && totalQuantity.value < props.quantity / 5) {
        totalQuantity.value++
        const existingOptionIndex = selectedOptions.value.findIndex(item => item.name === option.name);
        if (existingOptionIndex !== -1) {
            selectedOptions.value[existingOptionIndex].quantity++;
        } else {
            selectedOptions.value.push({ name: option.name, quantity: 1, price: parseFloat(option.price) });
        }
    }

    totalPrice.value += parseFloat(option.price)
};

const decrement = (option) => {
    const existingOptionIndex = selectedOptions.value.findIndex(item => item.name === option.name);
    if (existingOptionIndex !== -1 && selectedOptions.value[existingOptionIndex].quantity > 0) {
        selectedOptions.value[existingOptionIndex].quantity--;
        totalPrice.value -= parseFloat(option.price);
    }
};

const getCount = (option) => selectedOptions.value.reduce((acc, item) => (item.name === option.name ? acc + item.quantity : acc), 0);

watchEffect(() => {
    totalQuantity.value = selectedOptions.value.reduce((acc, item) => acc + item.quantity, 0);
});

</script>

<template>
    <div class="relative w-[90%] lg:mx-auto lg:w-4/5">
        <div class="w-full pt-8 pb-10 bg-white rounded-md lg:pr-8 lg:pl-9">
            <div class="flex justify-end">
                <button class="mr-5 lg:mr-5" @click="closeModal">
                    <CloseIcon />
                </button>
            </div>

            <div class="lg:flex gap-2">
                <div class="hidden lg:block">
                    <img class="object-cover w-full rounded-lg" :src="product.image" :alt="product.name" />
                </div>

                <div>
                    <div class="mx-4 mt-3 lg:mx-5">
                        <div class="text-center">
                            <p class="text-black font-bold text-lg lg:text-xl">{{ product.name }}</p>
                        </div>

                        <div class="mt-5 lg:px-6 h-96 lg:h-80 overflow-y-auto">
                            <div class="mb-2 flex gap-0 lg:gap-4 justify-between py-2 lg:py-4"
                                v-for="option in menuStore.combinadoItems" :key="option.id">
                                <div class="flex justify-between gap-1 text-gray-800">
                                    <p>{{ option.name }}</p>

                                    <p v-if="option.price != '0.00'">+ R$ {{ option.price }}</p>
                                </div>

                                <div class="flex gap-2 lg:gap-3">
                                    <button
                                        :class="{ 'opacity-100': totalQuantity > 0, 'opacity-70': totalQuantity < 1 }"
                                        :disabled="totalQuantity < 1" @click="decrement(option)">
                                        <MinusIcon />
                                    </button>

                                    <p>{{ getCount(option) }}</p>

                                    <button
                                        :class="{ 'opacity-100': totalQuantity < quantity / 5, 'opacity-70': totalQuantity > quantity / 5 - 1 }"
                                        :disabled="totalQuantity > quantity / 5 - 1" @click="increment(option)">
                                        <PlusIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-2 flex-row-reverse mt-10 mr-2 lg:mr-5">
                        <button type="submit" @click="addToCart(product)" :disabled="totalQuantity < quantity / 5"
                            :class="{ 'opacity-100': totalQuantity > quantity / 5 - 1, 'opacity-70': totalQuantity < quantity / 5 }"
                            class="py-2 text-base tracking-tighter text-white rounded-full px-7 bg-black">
                            Adicionar R$ <span>{{ (totalPrice).toFixed(2) }}</span>
                        </button>
                        <button @click="closeModal"
                            class="py-2 text-base tracking-tighter text-black bg-white border border-black rounded-full px-7">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>