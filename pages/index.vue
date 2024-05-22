<script setup>
import InstagramIcon from '../components/Icons/InstagramIcon.vue';
import WhatsappIcon from '../components/Icons/WhatsappIcon.vue'

import { useMenuStore } from '@/stores/menu.js'

const menu = useMenuStore()

const filteredItems = ref([]);
const search = ref('')

const handleFilteredItems = (newFilteredItems, searchQuery) => {
    console.log(newFilteredItems, searchQuery);
    filteredItems.value = newFilteredItems;
    search.value = searchQuery
};

</script>

<template>
    <NuxtLayout>
        <Title>SushiAky</Title>

        <div class="lg:h-screen bg-cover bg-home">
            <div
                class="flex flex-col lg:flex-row justify-center lg:justify-evenly gap-10 lg:gap-0 items-center lg:h-screen text-white pt-32 pb-16 lg:pt-0 lg:pb-0">

                <div class="flex flex-col gap-2 lg:gap-4">
                    <div>
                        <p
                            class="text-5xl text-center lg:text-6xl tracking-tighter font-black text-transparent bg-clip-text bg-contain bg-text-home">
                            SushiAky</p>
                        <p class="text-lg text-center lg:text-left">Segunda a Domingo</p>
                        <p class="text-lg text-center lg:text-left">18:00 às 01:00</p>
                    </div>

                    <div class="text-center lg:text-left">
                        <a href="#Cardapio">
                            <button type="button"
                                class="text-white bg-red-700 border border-red-700 font-medium rounded-full px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 hover:bg-transparent">
                                Confira nosso cardápio
                            </button>
                        </a>

                        <div class="flex gap-2 justify-center lg:justify-start">
                            <a href="https://instagram.com/sushiakyy/" target="_blank">
                                <button class="transition-all duration-200 hover:scale-110 fill-white">
                                    <InstagramIcon class="h-12 w-12" />
                                </button>
                            </a>

                            <a href="https://api.whatsapp.com/send?phone=5585996325360" target="_blank">
                                <button class="transition-all duration-200 hover:scale-110 fill-white">
                                    <WhatsappIcon class="h-12 w-12" />
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <img class="rounded-lg w-48 h-72 lg:w-96 lg:h-[450px] object-cover"
                        src="https://www.folhabv.com.br/wp-content/plugins/seox-image-magick/imagick_convert.php?width=2000&height=1333&format=.jpg&quality=91&imagick=uploads.folhabv.com.br/2023/09/1aaa.jpg"
                        alt="">

                    <div class="absolute top-40 left-24 lg:top-72 lg:left-52 w-48 lg:w-96 lg:h-48 rounded-xl">
                        <img class="w-48 lg:w-96 lg:h-48 object-cover" src="../assets/images/sushi-home.png" alt="">
                    </div>
                </div>

            </div>
        </div>

        <MenuSection @update:filteredItems="handleFilteredItems" />

        <div v-if="!search">
            <div class="bg-white py-16">
                <a id="Destaques" />
                <div class="px-4 pb-8 flex justify-between items-center">
                    <div class="w-14 h-4 lg:w-20 lg:h-7 rounded-full bg-text-title bg-cover"></div>
                    <p
                        class="text-center text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-contain bg-text-title">
                        Destaques
                    </p>
                    <p class="w-14 lg:w-20"></p>
                </div>

                <div class="pb-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <MostRequested :menus="menu.destaques" />
                </div>

            </div>

            <div class="bg-white py-16">
                <a id="Cardapio" />
                <div class="px-4 pb-8 flex justify-between items-center">
                    <p class="w-14 lg:w-20"></p>
                    <p
                        class="text-center text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-contain bg-text-title">
                        Nosso Cardápio
                    </p>
                    <div class="w-14 h-4 lg:w-20 lg:h-7 rounded-full bg-text-title bg-cover"></div>
                </div>

                <GridMenu location="Combos" title="Combos a parti de 1 Real a peça !!" :menus="menu.combos" />
                <GridMenu location="CombosPlus" title="Combo Plus da Hora !!" :menus="menu.comboPlus" />
                <GridMenu location="Temakis" title="Temakis *" :menus="menu.temakis" />
                <GridMenu location="HotHoll" title="Hot Holl" :menus="menu.hots" />
                <GridMenu location="Promo" title="Promo !!!" :menus="menu.promo" />
                <GridMenu location="Jhow" title="Jhow (4 unidades)" :menus="menu.jhow" />
                <GridMenu location="Niguiri" title="Niguiri (5 unidades)" :menus="menu.niguiris" />
                <GridMenu location="Sashimi" title="Sashimi (5 unidades)" :menus="menu.sashimis" />
                <GridMenu location="Uramaki" title="Uramaki (4 Unidades)" :menus="menu.urumakis" />
                <GridMenu location="Hossomaki" title="Hossomaki (4 Unidades)" :menus="menu.hossomakis" />
                <GridMenu location="CombosEspeciais" title="Combos Especial" :menus="menu.combosEspeciais" />

                <!--Combinado-->
                <MenuCombined location="Combinado" title="Combinado Aky" :menus="menu.combinadoAky" />
                <GridMenu location="Yakisoba" title="Yaskisoba" :menus="menu.yakisobas" />

                <GridMenu location="BurgueSushi" title="Burgue Sushi" :menus="menu.burgerSushi" />
                <GridMenu location="SushiGlass" title="Sushi Glass" :menus="menu.sushiGlass" />
                <GridMenu location="DogHoll" title="Dog Holl" :menus="menu.dogHoll" />
                <GridMenu location="Bebidas" title="Bebidas" :menus="menu.bebidas" />
                <GridMenu location="Complementos" title="Complementos" :menus="menu.complementos" />
            </div>
        </div>

        <div v-else>
            <GridMenu :title="'Buscar: ' + search" :menus="filteredItems" />
        </div>

        <div class="flex justify-center pb-16 bg-white">
            <a id="Contato" />
            <div class="rounded-xl border border-gray-200 shadow-lg p-8 flex justify-center flex-col gap-4 text-black">
                <p class="text-xl lg:text-2xl font-bold">Confira nosso Instagram</p>
                <a href="https://instagram.com/sushiakyy/" target="_blank">
                    <div class="flex justify-center">
                        <InstagramIcon class="h-16 w-16" />
                    </div>
                    <p class="text-center text-lg mt-2">@sushiakyy</p>
                </a>
            </div>
        </div>
    </NuxtLayout>
</template>

<style>
.bg-home {
    background-image: url('../assets/images/bg-sushiaky.jpg');
}

.bg-text-home {
    background-image: url('../assets/images/bg-sushiaky-text.jpg');
}

.bg-text-title {
    background-image: url('../assets/images/bg-sushiaky-title.jpg');
}
</style>