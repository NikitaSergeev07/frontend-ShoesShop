<template>
  <div class="layout-container">
    <AppHeader></AppHeader>
    <div class="page-content">
      <div class="header-section">
        <h1 class="title">Добро пожаловать в наш каталог!
        </h1>

        <div class="controls-container">
          <select class="select-sort" v-model="sortParameter">
            <option value="name">По названию</option>
            <option value="price_asc">По цене (дешевые)</option>
            <option value="price_desc">По цене (дорогие)</option>
          </select>


          <div class="search-container">
            <input
                type="text"
                v-model="searchQuery"
                class="search-input"
                placeholder="Поиск..."
                @keydown.enter="performSearch"
            />
            <div class="search-icon" @click="performSearch">
              <img src="/search.svg" alt="search" />
            </div>
          </div>
          <button class="reset-button" @click="resetSearch">Сброс</button>
        </div>
      </div>

      <div class="product-grid">
        <product-card
            v-for="(product) in products"
            :key="product.id"
            :title="product.title"
            :price="product.price"
            :img="product.image_urls.length > 0 ? product.image_urls[0] : '../public/favicon.ico'"
            :product-id="product.id"
        />
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import AppFooter from "@/components/AppFooter.vue";
import axios from "axios";

export default {
  components: { AppFooter, AppHeader, ProductCard },
  data() {
    return {
      userId: null,
      products: [],
      searchQuery: '',
      sortParameter: 'name',
    };
  },
  watch: {
    sortParameter() {
      this.updateProducts();
    },
  },

  created() {
    this.userId = sessionStorage.getItem('userId');
    this.updateProducts();
  },
  methods: {
    async updateProducts() {
      try {
        const queryParam = this.searchQuery.trim()
            ? `query=${this.searchQuery}`
            : '';
        const sortParam = `sort=${this.sortParameter}`;

        const response = await axios.get(
            `http://localhost:8000/api/items/search?${queryParam}&${sortParam}`
        );
        console.log(response.data);
        this.products = response.data;
      } catch (error) {
        console.error('Ошибка при обновлении списка продуктов:', error);
      }
    },
    async performSearch() {
      await this.updateProducts();
    },
    resetSearch() {
      this.searchQuery = '';
      this.sortParameter = 'name';
      this.updateProducts();
    },
  },
};

</script>


<style scoped>

.user-id {
  font-size: 1.2rem;
  color: #6b7280; /* Серый цвет */
  margin-left: 0.5rem;
}

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  padding: 2.5rem; /* заменяет p-10 */
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem; /* заменяет mb-10 */
}

.title {
  font-size: 2rem; /* заменяет text-3xl */
  font-weight: bold;
}

.controls-container {
  display: flex;
  align-items: center;
  gap: 1rem; /* заменяет gap-4 */
}

.select-sort {
  padding: 0.5rem 0.75rem; /* заменяет py-2 px-3 */
  border: 1px solid #d1d5db; /* заменяет border-gray-200 */
  border-radius: 0.375rem; /* заменяет rounded-md */
  outline: none;
}

.select-sort:focus {
  border-color: #9ca3af; /* заменяет focus:border-gray-400 */
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db; /* Добавлен бордер */
  border-radius: 0.375rem;
}

.search-input {
  padding: 0.5rem 0.75rem;
  padding-left: 2.5rem; /* для иконки */
  border: none;
  outline: none;
  height: 2.5rem; /* Высота для выравнивания */
}

.search-input:focus {
  border-color: #9ca3af;
}

.search-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.search-icon:hover {
  transform: scale(1.1);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 карточки в строке */
  gap: 2.5rem; /* Зазор между карточками */
}

.reset-button {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6; /* светлый цвет */
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.reset-button:hover {
  background-color: #e5e7eb; /* чуть темнее при наведении */
}

@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr); /* заменяет sm:grid-cols-2 */
  }
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr); /* заменяет md:grid-cols-3 */
  }
}
</style>
