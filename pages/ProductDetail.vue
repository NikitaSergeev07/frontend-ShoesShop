<template>
  <AppHeader></AppHeader>
  <div class="product-detail-container">
    <div class="product-detail">
      <div class="image-slider-wrapper">
        <ImageSlider :images="product.images" />
      </div>
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="price">Цена: {{ product.price }} руб.</p>

        <div class="size-selection">
          <h2>Выберите размер:</h2>
          <div class="size-options">
            <button v-for="size in product.sizes" :key="size" class="size-button">{{ size }}</button>
          </div>
        </div>

        <p class="description">{{ product.description }}</p>

        <button class="form__button">Добавить в корзину за {{ product.price }} руб.</button>
      </div>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ImageSlider from "@/components/ImageSlider.vue";

export default {
  components: {
    AppFooter,
    AppHeader,
    ImageSlider
  },
  setup() {
    const route = useRoute();
    const product = ref({
      title: '',
      images: [],
      price: '',
      sizes: [],
      description: ''
    });

    onMounted(async () => {
      const productId = route.params.id;

      try {
        const response = await axios.get(`http://localhost:8000/api/items/${productId}`);
        const productData = response.data;

        product.value = {
          title: productData.title,
          images: productData.image_urls,
          price: productData.price,
          sizes: productData.sizes || [35, 35.5, 36, 36.5, 37, 38, 39, 40, 40.5, 41, 41.5, 42, 42.5, 43.5, 44, 45, 45.5],
          description: productData.description
        };
      } catch (error) {
        console.error("Ошибка при загрузке данных продукта:", error);
      }
    });

    return { product };
  }
};
</script>


<style scoped>
.product-detail-container {
  padding: 2rem;
  max-width: 1200px; /* Ограничиваем максимальную ширину страницы */
  margin: 0 auto; /* Центрируем контейнер */
}

.product-detail {
  display: flex;
  gap: 2rem;
  align-items: center; /* Центрирование по вертикали */
}

.image-slider-wrapper {
  flex: 1;
  display: flex;
  justify-content: center; /* Центрирование слайдера по горизонтали */
  align-items: center; /* Центрирование слайдера по вертикали */
}

.product-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрирование контента внутри блока */
}

.price {
  font-size: 1.5rem;
  color: #333;
  margin: 1rem 0;
}

.size-selection {
  margin: 1rem 0;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
}

.size-button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  width: calc(25% - 1rem); /* Каждый размер занимает 25% ширины (максимум 4 на строку) */
}

.size-button:hover {
  background-color: #eaeaea;
}

.buy-button {
  padding: 1rem;
  background-color: #ff4742;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 1rem 0;
}

.buy-button:hover {
  background-color: #e13e3a;
}

.description {
  font-size: 1rem;
  color: #666;
  margin: 1rem 0;
}
</style>

