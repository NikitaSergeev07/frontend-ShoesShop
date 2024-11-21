<template>
  <AppHeader></AppHeader>
  <div class="product-detail-container">
    <h1>{{ product.title }}</h1>
    <img :src="product.img" alt="Sneaker" class="product-image"/>
    <p class="price">{{ product.price }} руб.</p>
    <p class="description">{{ product.description }}</p>
  </div>
  <AppFooter></AppFooter>
</template>

<script>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {AppFooter, AppHeader},
  setup() {
    const route = useRoute();
    const product = ref({
      title: '',
      img: '',
      price: '',
      description: ''
    });

    onMounted(() => {
      const productId = route.params.id;  // Получаем id из маршрута
      // Здесь нужно получить данные о продукте, например, с API или из состояния
      // Для демонстрации используется mock данные
      product.value = {
        title: `Продукт ${productId}`,
        img: '/sneakers/sneakers-1.jpg',
        price: 1000,
        description: 'Описание продукта'
      };
    });

    return {
      product
    };
  }
};
</script>

<style scoped>
.product-detail-container {
  padding: 2rem;
}

.product-image {
  width: 100%;
  height: auto;
}

.price {
  font-size: 1.5rem;
  color: #333;
}

.description {
  font-size: 1rem;
  color: #666;
}
</style>
