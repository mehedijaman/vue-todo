import {ref, reactive, computed} from 'vue';
import {defineStore} from 'pinia';

const productStore = defineStore('product', () => {
    const products = reactive([]);
    const totalProducts = computed(() => products.length);
    const addProduct = (product) => {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
        }
        products.push(data);
    };

    return {products, addProduct, totalProducts};
});

export {productStore};