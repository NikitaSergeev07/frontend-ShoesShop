<template>
  <div
      class="product-card relative flex flex-col w-full max-w-sm border border-gray-300 rounded-xl p-5 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
  >
    <!-- Лайк в левом верхнем углу -->
    <div class="absolute top-4 left-4 z-10">
      <img :src="isLiked ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" class="w-6 h-6" @click="onClick"/>
    </div>

    <!-- Картинка товара -->
    <router-link :to="`/product/${productId}`" class="product-link">
      <img :src="img" alt="Sneaker" class="w-full h-48 object-cover rounded-lg mb-4"/>
      <h3 class="font-semibold text-lg mb-2 truncate">{{ title }}</h3>
    </router-link>

    <!-- Цена и кнопка добавления в корзину -->
    <div class="price-container flex justify-between items-center mt-4">
      <div class="price-text flex items-center">
        <span class="block text-sm text-gray-600 mr-2">Цена:</span>
        <span class="font-bold text-lg text-gray-800 price-number">{{ price }}</span>
        <span class="rub-text">руб.</span>
      </div>
      <button class="add-to-cart-btn" @click="addToCart">
        <img src="/plus.svg" alt="Add to cart" class="w-6 h-6"/>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    productId: {
      type: Number,
      required: true
    }
  },
  setup() {
    const isLiked = ref(false);

    const onClick = (e) => {
      isLiked.value = !isLiked.value;
      e.stopPropagation(); // предотвращаем переход при клике на лайк
    };

    const addToCart = (e) => {
      e.stopPropagation(); // предотвращаем переход при клике на кнопку добавления в корзину
      // Логика добавления товара в корзину
    };

    return {
      isLiked,
      onClick,
      addToCart
    };
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Обязательно для работы absolute элементов */
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.add-to-cart-btn {
  background-color: #f3f4f6;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background-color: #e5e7eb;
}

img {
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.05);
}

.price-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.price-text {
  display: flex;
  align-items: center;
}

.price-text .text-sm {
  margin-right: 0.5rem;
}

.add-to-cart-btn {
  margin-left: 1rem;
}

.price-text .font-bold {
  font-size: 1.25rem; /* Увеличиваем размер шрифта */
}

.price-text .price-number {
  font-weight: bold; /* Число будет жирным */
}

.price-text .rub-text {
  font-weight: bold; /* Жирный шрифт для руб. */
  font-size: 1.25rem; /* Размер шрифта для "руб." */
  margin-left: 0.5rem; /* Небольшой отступ слева */
}

/* Сброс стилей ссылки для текста */
.product-link {
  text-decoration: none; /* Убираем подчеркивание */
  color: inherit; /* Наследуем цвет от родителя */
}

.product-link h3 {
  color: inherit; /* Наследуем цвет от родителя для заголовка */
}
</style>
