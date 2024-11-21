<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo" @click="scrollToTop">
        <img src="../../public/logo.png" alt="Logo" class="footer-logo-img"/>
      </div>
      <div class="footer-text">
        <p>© 2024 Сити-Класс. Все права защищены.</p>
      </div>
      <div class="footer-links">
        <!-- Используем router-link для навигации через Vue Router -->
        <router-link to="/about" class="footer-link">О нас</router-link>
        <router-link to="/contacts" class="footer-link">Контакты</router-link>
        <router-link to="/reviews" class="footer-link">Отзывы</router-link>
        <a href="https://instagram.com" class="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://facebook.com" class="footer-link" target="_blank" rel="noopener noreferrer">Facebook</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавная прокрутка
      });
    }
  }
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center; /* Центрируем все содержимое */
  align-items: center;
  padding: 16px 40px;
  background-color: #f4f4f4; /* Светло-серый фон */
  border-top: 2px solid #e2e8f0; /* Тонкая линия сверху */
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); /* Нежная тень */
  color: #1f2937; /* Цвет текста */
  flex-direction: column; /* Режим вертикального выравнивания */
  text-align: center; /* Центрируем текст */
}

.footer-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрируем элементы внутри контейнера */
  align-items: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer; /* Указатель при наведении */
}

.footer-logo-img {
  width: 40px;
  height: auto;
}

.footer-text p {
  color: #4b5563; /* Светло-серый цвет для текста */
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.footer-link {
  color: #1f2937; /* Темный цвет текста */
  text-decoration: none;
  transition: color 0.3s, transform 0.3s;
}

.footer-link:hover {
  color: #1d4ed8; /* Синий оттенок при наведении */
}

.footer-links a {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
  }

  .footer-links {
    flex-direction: column;
    margin-top: 10px;
  }
}
</style>
