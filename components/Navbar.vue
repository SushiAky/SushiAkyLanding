<script setup>
import MenuIcon from '@/components/Icons/MenuIcon.vue';
import CartIcon from './Icons/CartIcon.vue';
import CloseIcon from './Icons/CloseIcon.vue';
import TrashIcon from './Icons/TrashIcon.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useCartStore } from '../stores/cart.js';

const menu = ref(false)
const modalFormProduct = ref(false)
const modalFormBuy = ref(false)
const cartStore = useCartStore()

const isHidden = ref(false);
let lastScrollTop = 0;

const isNavbarOpaque = ref(false);

const handleScroll = () => {
    const scrollThreshold = 100;
    isNavbarOpaque.value = window.scrollY > scrollThreshold;

    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        isHidden.value = true;
    } else {
        isHidden.value = false;
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
};

const openFormBuy = () => {
    modalFormProduct.value = false
    modalFormBuy.value = true
}

const backToCart = () => {
    modalFormBuy.value = false
    modalFormProduct.value = true
}

const address = ref('')
const payment = ref('')

const continueBuy = () => {
    const number = "5585996325360";
    const cartItems = cartStore.items;
    const addressText = "Endereço: " + address.value;
    const paymentText = "Pagamento: " + payment.value;

    let pedido = "Pedidos:\n";

    cartItems.forEach((item, index) => {
        pedido += `${index + 1}. ${item.name}\n`;
    });

    pedido += `\n${addressText}\n${paymentText}`;

    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(pedido)}`;

    cartStore.clearCart

    window.open(url, "_blank");

    modalFormProduct.value = false;
    address.value = '';
    payment.value = '';
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <nav :class="{ 'border-b border-b-black bg-black': isNavbarOpaque }"
        class="fixed top-0 z-30 w-full transition duration-700 ease-in-out">
        <!--, 'lg:-translate-y-full lg:ease-in': isHidden, 'lg:-translate-y-0 lg:ease-out': !isHidden-->
        <div class="flex flex-wrap items-center justify-between max-w-screen-2xl px-1 lg:px-4 py-3 lg:py-0 mx-auto">

            <NuxtLink to="/"
                class="flex items-center gap-1 transition relative duration-700 ease-in-out text-transparent">
                <img src="../assets/images/logo.jpeg" class="absolute z-10 -top-3 h-20 w-14 object-cover rounded-lg">
                <p
                    class="self-center text-xl font-semibold lg:text-2xl ml-16 whitespace-nowrap text-white text-secondary">
                    SushiAky</p>
            </NuxtLink>

            <div class="flex gap-1 items-center lg:order-2 lg:hidden text-white">
                <button @click="modalFormProduct = true" class="text-white relative">
                    <CartIcon />

                    <div class="absolute -right-2 -bottom-3">
                        <p class="">
                            {{ cartStore.items.length }}
                        </p>
                    </div>
                </button>

                <button @click="menu = !menu" :class="{ 'opened': menu }"
                    class="inline-flex items-center justify-center w-10 h-10 p-1 text-sm line-color-white rounded-lg lg:hidden transition duration-700 ease-in-out">
                    <MenuIcon />
                </button>
            </div>

            <div :class="{ 'lg:block': menu, 'hidden lg:block': !menu }" class="w-full lg:w-auto lg:order-1 z-20"
                id="navbar-default">
                <ul :class="{ 'bg-black': isNavbarOpaque || menu, '': !isNavbarOpaque }"
                    class="flex flex-col transition duration-700 ease-in-out text-transparent p-4 mt-4 font-medium border border-gray-100 rounded-lg lg:p-0 lg:flex-row lg:space-x-12 lg:mt-0 lg:border-0 lg:bg-transparent">
                    <li>
                        <a href="#Destaques">
                            <button
                                class="block py-2 pl-3 text-sm pr-4 rounded lg:border-0 lg:py-5 text-white uppercase">
                                Destaques
                            </button>
                        </a>
                    </li>

                    <li>
                        <a href="#Cardapio">
                            <button
                                class="block py-2 pl-3 text-sm pr-4 rounded lg:border-0 lg:py-5 text-white uppercase">
                                Cardápio
                            </button>
                        </a>
                    </li>

                    <li>
                        <button class="block py-2 pl-3 text-sm pr-4 rounded lg:border-0 lg:py-5 text-white uppercase">
                            Contato
                        </button>
                    </li>

                    <li class="hidden lg:flex">
                        <button @click="modalFormProduct = true"
                            class="block relative py-2 pl-3 text-sm pr-4 rounded lg:border-0 lg:py-5 text-red-500 uppercase">
                            <CartIcon />

                            <div class="absolute right-1 bottom-3 px-1 ">
                                <p class="text-white">
                                    {{ cartStore.items.length }}
                                </p>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <Transition>
        <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
            v-show="modalFormProduct">
            <div class="relative w-4/5 lg:mx-auto lg:w-2/5">
                <div class="w-full pt-6 pb-8 bg-white rounded-md lg:px-6">
                    <div class="flex justify-end">
                        <button class="mr-5 lg:mr-5" @click="modalFormProduct = false">
                            <CloseIcon />
                        </button>
                    </div>

                    <div class="mt-6">
                        <p
                            class="text-2xl tracking-tight text-center font-black text-transparent bg-clip-text bg-contain bg-text-title">
                            Meu Carrinho</p>
                    </div>

                    <div v-if="cartStore.items.length > 0">
                        <div class="mt-4 lg:mx-2 max-h-48 lg:max-h-64 overflow-y-auto overflow-x-hidden">
                            <div v-for="(product, index) in cartStore.items" :key="product.id"
                                class="px-4 py-3 mb-3 border-b">
                                <div class="w-full">
                                    <p>{{ product.name }}</p>
                                </div>

                                <div class="flex justify-end mt-2 lg:mt-1 gap-2">
                                    <p>R${{ product.price }}</p>
                                    <button class="text-black" @click="cartStore.removeFromCart(product)">
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end mx-5 mt-3">
                            <p>Total: R${{ parseFloat(cartStore.cartTotal).toFixed(2) }}</p>
                        </div>
                    </div>

                    <div v-else class="my-10">
                        <p class="text-lg text-center">Seu carrinho está vazio</p>
                    </div>

                    <div class="flex flex-row-reverse gap-5 mt-10 mr-4">
                        <button type="submit" @click="openFormBuy" v-if="cartStore.items.length > 0"
                            class="py-2 text-base tracking-tighter text-white bg-black rounded-full px-7">
                            Continuar
                        </button>
                        <button @click="modalFormProduct = false"
                            class="py-2 text-base tracking-tighter text-black bg-white border border-black rounded-full px-7">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
    <div v-show="modalFormProduct" class="fixed inset-0 z-40 bg-black opacity-75"></div>

    <Transition>
        <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
            v-show="modalFormBuy && cartStore.items.length > 0 && !modalFormProduct">
            <div class="relative w-4/5 lg:mx-auto lg:w-2/5">
                <div class="w-full pt-8 pb-10 bg-white rounded-md lg:pr-8 lg:pl-9">
                    <div class="flex justify-end">
                        <button class="mr-5" @click="modalFormBuy = false">
                            <CloseIcon />
                        </button>
                    </div>

                    <div class="mt-6">
                        <p
                            class="text-2xl text-center font-black text-transparent bg-clip-text bg-contain bg-text-title">
                            Preencha o
                            formulário para
                            fechar a compra</p>
                    </div>

                    <div class="mx-4 mt-4 space-y-6">
                        <div>
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Seu
                                Endereço</label>
                            <input type="text" id="address" placeholder="Rua, 999, Bairro" v-model="address"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                required>
                        </div>
                        <div>
                            <label for="payment" class="block mb-2 text-sm font-medium text-gray-900">Metodo
                                de Pagamento</label>
                            <select id="payment" v-model="payment" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                <option selected disabled>Escolha um metodo de Pagamento</option>
                                <option value="Pix">Pix</option>
                                <option value="Cartao de Crédito">Cartao de Crédito</option>
                                <option value="Cartao de Debito">Cartao de Debito</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-row-reverse gap-5 mt-10 mr-4">
                        <button type="submit" @click="continueBuy"
                            class="py-2 text-base tracking-tighter text-white bg-black rounded-full px-7">
                            Continuar
                        </button>
                        <button @click="backToCart"
                            class="py-2 text-base tracking-tighter text-black bg-white border border-black rounded-full px-7">
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
    <div v-show="modalFormBuy" class="fixed inset-0 z-40 bg-black opacity-75"></div>
</template>

<style>
.traced-black {
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: #67e8f9;
}

.menu {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    padding: 0;
}

.line {
    fill: none;
    stroke-width: 7;
    transition: stroke-dasharray 500ms cubic-bezier(0.4, 0, 0.2, 1),
        stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line-color-white {
    stroke: white;
}

.line-color-black {
    stroke: #67e8f9;
}

.line1 {
    stroke-dasharray: 60 207;
    stroke-width: 7;
}

.line2 {
    stroke-dasharray: 60 60;
    stroke-width: 7;
}

.line3 {
    stroke-dasharray: 60 207;
    stroke-width: 7;
}

.opened .line1 {
    stroke-dasharray: 90 207;
    stroke-dashoffset: -134;
    stroke-width: 6;
}

.opened .line2 {
    stroke-dasharray: 1 60;
    stroke-dashoffset: -30;
    stroke-width: 6;
}

.opened .line3 {
    stroke-dasharray: 90 207;
    stroke-dashoffset: -134;
    stroke-width: 6;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>