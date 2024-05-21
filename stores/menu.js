import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {

    const calzones = [
        {
            id: 1, //
            name: 'Guioza (4 Unidades)',
            description: 'Pastel recheado com Legumes e carne bovina',
            price: '17.90',
            type: 'Entradas',
            image: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/0b7470e3-6031-40bb-99ca-94e009621556/202310092235_M3AX_i.jpg',
            location: 'Entradas'
        },
        {
            id: 2,
            name: 'Harumaki (4 Unidades)',
            description: 'Rolinhos primavera recheados com queijo',
            price: '15.90',
            type: 'Entradas',
            image: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/0b7470e3-6031-40bb-99ca-94e009621556/202310101539_85KL_i.jpg',
        },
        {
            id: 3,
            name: 'Harumaki Chocolate (4 Unidades)',
            description: 'Rolinho primavera recheados com chocolate. Muiiiito Bom pra finalizar sua refeicão, e servir como sobremesa.',
            price: '15.90',
            type: 'Entradas',
            image: 'https://static.ifood-static.com.br/image/upload/t_medium/pratos/0b7470e3-6031-40bb-99ca-94e009621556/202310101541_0866_i.jpg',
        },
    ];

    return {
        calzones
    }
})