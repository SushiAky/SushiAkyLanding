<script setup>
import { onMounted, ref, computed, watch, defineEmits } from 'vue';
import { useMenuStore } from '../stores/menu.js';

const menusType = [
    { name: 'Combos', location: '#Combos' },
    { name: 'Combos Plus', location: '#CombosPlus' },
    { name: 'Temakis', location: '#Temakis' },
    { name: 'Hot Holl', location: '#HotHoll' },
    { name: 'Promo', location: '#Promo' },
    { name: 'Jhow', location: '#Jhow' },
    { name: 'Niguiri', location: '#Niguiri' },
    { name: 'Sashimi', location: '#Sashimi' },
    { name: 'Uramaki', location: '#Uramaki' },
    { name: 'Hossomaki', location: '#Hossomaki' },
    { name: 'Combos Especiais', location: '#CombosEspeciais' },
    { name: 'Combinado', location: '#Combinado' },
    { name: 'Yakisoba', location: '#Yakisoba' },
    { name: 'Burgue Sushi', location: '#BurgueSushi' },
    { name: 'Sushi Glass', location: '#SushiGlass' },
    { name: 'Dog Holl', location: '#DogHoll' },
    { name: 'Bebidas', location: '#Bebidas' },
    { name: 'Complementos', location: '#Complementos' },
]

const menuStore = useMenuStore();
const search = ref('')
const emits = defineEmits(['update:filteredItems']);
const allItems = computed(() => {
    return [
        ...menuStore.combos,
        ...menuStore.comboPlus,
        ...menuStore.temakis,
        ...menuStore.hots,
        ...menuStore.promo,
        ...menuStore.jhow,
        ...menuStore.niguiris,
        ...menuStore.sashimis,
        ...menuStore.urumakis,
        ...menuStore.hossomakis,
        ...menuStore.combosEspeciais,
        ...menuStore.burgerSushi,
        ...menuStore.sushiGlass,
        ...menuStore.dogHoll,
        ...menuStore.complementos,
        ...menuStore.yakisobas,
        ...menuStore.bebidas,
        ...menuStore.combinadoAky,
    ];
});
const filteredItems = computed(() => {
    return allItems.value.filter(item => {
        return item.name.toLowerCase().includes(search.value.toLowerCase()) ||
            item.description.toLowerCase().includes(search.value.toLowerCase());
    });
});

watch(filteredItems, (newFilteredItems) => {
    emits('update:filteredItems', newFilteredItems, search.value);
});

const open = ref(false)
const openSearch = ref(false)

const selectedMenu = ref('')

const changeSelectedMenu = (menu) => {
    open.value = false
    selectedMenu.value = menu
}

onMounted(() => {
    changeSelectedMenu(menusType[0].name)
})
</script>

<template>
    <div class="sticky top-16 w-full bg-white border-b z-20 px-4 lg:px-16 py-1.5 lg:py-3">
        <div class="hidden lg:flex justify-between items-center">
            <div class="relative z-30 w-full lg:w-[31rem]">
                <div class="flex justify-between px-5 hover:font-medium cursor-pointer" @click="open = !open">
                    <p class="text-lg">{{ selectedMenu }}</p>

                    <button class="transition ease-in-out duration-300"
                        :class="{ 'rotate-180': open, 'rotate-0': !open }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </div>

                <Transition>
                    <div v-show="open"
                        class="absolute px-5 top-8 bg-white w-72 lg:w-128 h-52 overflow-y-auto rounded-lg shadow-xl flex flex-row lg:flex-col">
                        <a :href="menu.location" v-for="menu in menusType">
                            <p @click="changeSelectedMenu(menu.name)" class="text-lg w-full py-2 border-b">
                                {{ menu.name }}
                            </p>
                        </a>
                    </div>
                </Transition>
            </div>

            <div class="relative z-30 w-full lg:w-[31rem] flex items-center gap-2">
                <IconsSearchIcon />
                <input placeholder="Buscar" v-model="search"
                    class="text-gray-900 rounded block w-full p-2 focus:outline-none">
            </div>
        </div>

        <div class="lg:hidden flex gap-2">
            <div class="flex gap-7 overflow-x-auto py-4">
                <a :href="menu.location" class="flex-shrink-0" v-for="menu in menusType">
                    <p @click="changeSelectedMenu(menu.name)"
                        :class="{ 'border-b-2 border-red-600': selectedMenu == menu.name }">
                        {{ menu.name }}
                    </p>
                </a>
            </div>

            <button @click="openSearch = !openSearch">
                <IconsSearchIcon />
            </button>
        </div>
    </div>

    <div class="lg:hidden transition-all duration-300 w-full bg-white border-b z-10 px-4 lg:px-16 py-2 lg:py-3 sticky top-[135px]"
        :class="{ '-translate-y-full ease-in': !openSearch, '-translate-y-0 ease-out': openSearch }">
        <div class="flex gap-2 items-center">
            <IconsSearchIcon />
            <input placeholder="Buscar" v-model="search"
                class="text-gray-900 rounded block w-full p-2 focus:outline-none">
        </div>
    </div>
</template>
