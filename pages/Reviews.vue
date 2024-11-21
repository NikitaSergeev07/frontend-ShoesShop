<template>
  <AppHeader></AppHeader>
  <div class="reviews-page">
    <h1>Отзывы о нас</h1>

    <div class="reviews-list">
      <div class="review-item" v-for="review in reviews" :key="review.id">
        <div v-if="review.category === 'product'" class="review-product">
          <img
              :src="getProductImage(review.item_id)"
              alt="Product image"
              class="product-image"
          />
          <div class="product-info">
            <p class="product-title">{{ getProductTitle(review.item_id) }}</p>
          </div>
        </div>
        <h3>
          {{ review.name_of_reviewer }}
          <span class="rating">({{ review.score }} ★)</span>
        </h3>
        <p>{{ review.text }}</p>
        <p class="category">Категория: {{ review.category }}</p>
        <p class="date">{{ formatDate(review.date) }}</p>
      </div>
    </div>


    <div class="feedback-form">
      <h3>Оставьте свой отзыв</h3>
      <form @submit.prevent="submitFeedback">
        <div class="form-group">
          <label for="name">Ваше имя:</label>
          <input type="text" id="name" v-model="feedback.name" required placeholder="Введите ваше имя" />
          <span v-if="!feedback.name" class="error">Это поле обязательно для заполнения</span>
        </div>
        <div class="form-group">
          <label for="feedback">Ваш отзыв:</label>
          <textarea id="feedback" v-model="feedback.message" rows="4" required placeholder="Напишите ваш отзыв"></textarea>
          <span v-if="!feedback.message" class="error">Это поле обязательно для заполнения</span>
        </div>
        <div class="form-group">
          <label>Оценка:</label>
          <div class="stars">
            <span
                v-for="n in 5"
                :key="n"
                class="star"
                :class="{ 'filled': n <= feedback.rating }"
                @click="setRating(n)"
            >★</span>
          </div>
          <span v-if="feedback.rating === 0" class="error">Пожалуйста, выберите оценку</span>
        </div>


        <div class="form-group">
          <label for="category">Категория:</label>
          <select id="category" v-model="feedback.category" required>
            <option value="service">Сервис</option>
            <option value="product">Продукт</option>
            <option value="website">Веб-сайт</option>
          </select>
          <span v-if="!feedback.category" class="error">Это поле обязательно для выбора</span>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="feedback.agree" /> Я согласен на обработку персональных данных
          </label>
        </div>

        <div class="form-group" v-if="feedback.category === 'product'">
          <label for="product">Выберите продукт:</label>
          <VueSelect
              :items="products"
              :value="selectedProductId"
              @productId="updateSelectedProductId"
          />
        </div>

        <div class="form-group">
          <button  class="form__button" :disabled="!isFormValid">Отправить отзыв</button>
        </div>
      </form>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import axios from "axios";
import VueSelect from "@/components/VueSelect.vue";

export default {
  name: "ProductReviews",
  components: {VueSelect, AppFooter, AppHeader },
  data() {
    return {
      products: [],
      reviews: [],
      feedback: {
        name: '',
        message: '',
        rating: 0,
        agree: false,
        category: 'product'
      },
      selectedProductId: null,
    };
  },
  computed: {
    isFormValid() {
      return (
          this.feedback.name &&
          this.feedback.message &&
          this.feedback.rating > 0 &&
          this.feedback.category &&
          this.feedback.agree &&
          (this.feedback.category !== "product" || this.selectedProductId)
      );
    },
    productsWithLabels() {
      return this.products.map(product => ({
        label: product.title,
        value: product.id
      }));
    },
  },
  methods: {
    getProductImage(itemId) {
      const product = this.products.find((product) => product.id === itemId);
      return product && product.image_urls.length > 0 ? product.image_urls[0] : 'default-image.jpg';
    },
    getProductTitle(itemId) {
      const product = this.products.find((product) => product.id === itemId);
      return product ? product.title : 'Неизвестный продукт';
    },
    updateSelectedProductId(productId) {
      console.log("Received productId in parent:", productId); // Лог для проверки
      this.selectedProductId = productId;
    },
    async fetchReviews() {
      try {
        const response = await axios.get("http://localhost:8000/api/reviews");
        this.reviews = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:8000/api/items");
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
      }
    },
    async submitFeedback() {
      try {
        const userId = sessionStorage.getItem('userId');
        const toNow = new Date().toISOString();
        console.log({
          name_of_reviewer: this.feedback.name,
          text: this.feedback.message,
          score: this.feedback.rating,
          category: this.feedback.category,
          date: toNow,
          user_id: parseInt(userId),
          item_id: this.selectedProductId,
        });
        await axios.post('http://localhost:8000/api/reviews', {
          name_of_reviewer: this.feedback.name,
          text: this.feedback.message,
          score: this.feedback.rating,
          category: this.feedback.category,
          date: toNow,
          user_id: parseInt(userId),
          item_id: this.selectedProductId,
        });
        await this.fetchReviews();
        this.feedback = {
          name: '',
          message: '',
          rating: 0,
          agree: false,
          category: 'product',
        };
      } catch (error) {
        console.error("Ошибка при загрузке данных отзыва:", error.response ? error.response.data : error);
        alert("Не удалось отправить отзыв. Попробуйте позже.");
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    setRating(rating) {
      this.feedback.rating = rating;
    }
  },
  mounted() {
    this.fetchReviews();
    this.fetchProducts();
  },
};
</script>

<style scoped>

.vue-select-dropdown {
  position: absolute;
  z-index: 10; /* Убедитесь, что список виден над другими элементами */
  background: white;
  border: 1px solid #ccc;
  max-height: 200px; /* Ограничьте высоту, чтобы не перекрывать весь экран */
  overflow-y: auto; /* Добавьте прокрутку */
}
.vue-select {
  position: relative;
  display: inline-block; /* Чтобы список был связан с селектом */
  width: 100%; /* Убедитесь, что поле занимает всю доступную ширину */
}


.product-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.product-item p {
  margin-top: 10px;
  font-size: 0.9em;
  color: #333;
  text-align: center;
}
.review-product {
  display: flex;
  align-items: center; /* Центрирует текст по вертикали относительно изображения */
  margin-bottom: 10px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px; /* Отступ между изображением и текстом */
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрирует текст внутри, если появятся дополнительные элементы */
}

.product-title {
  font-weight: bold;
  font-size: 1em;
  color: #333;
  text-align: left; /* Текст выравнивается по левому краю */
}


.product-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-item.selected {
  border-color: gold;
  box-shadow: 0 0 10px gold;
}


.reviews-page {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.reviews-list {
  margin-bottom: 30px;
}

.review-item {
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.review-item h3 {
  margin: 0;
  font-size: 1.2em;
}

.rating {
  color: gold;
  margin-left: 20px;
}


.category {
  font-size: 0.9em;
  color: #666;
}

.date {
  font-size: 0.8em;
  color: #aaa;
}

.feedback-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.feedback-form h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

input[type="checkbox"] {
  margin-right: 8px;
}


.form-group label {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.form-group input[type="checkbox"] {
  margin-right: 10px; /* Отступ между чекбоксом и текстом */
}


input[type="text"],
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}



.error {
  color: rgba(255, 0, 0, 0.6); /* Бледный полупрозрачный красный */
  font-size: 0.85em;
}

.stars {
  display: inline-block;
}

.star {
  font-size: 1.5em;
  color: #ddd;
  cursor: pointer;
}

.star.filled {
  color: gold;
}

.star:hover,
.star.filled:hover {
  color: gold;
}
</style>
