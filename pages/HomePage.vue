<template>
  <div class="layout-container">
    <AppHeader></AppHeader>

    <div class="home-page">
      <h1>Привет!</h1>

      <p class="welcome-text">
        Добро пожаловать в наш семейный дневник эмоций!<br><br>
        Здесь мы будем делиться нашими чувствами, переживаниями и радостями — большими и маленькими. Этот дневник — наше место для искренности, поддержки и взаимопонимания. Он помогает нам фиксировать моменты, которые придают жизни смысл, учиться понимать друг друга и ценить каждый день, проведенный вместе.<br><br>
        Каждый день — новая страница, на которой мы можем записать наши эмоции, впечатления и важные события. Пусть этот дневник станет хранителем наших воспоминаний и путеводителем на пути к гармонии и счастью.<br><br>
        Каким был твой сегодняшний день?
      </p>

      <div class="button-container">
        <button class="btn btn-fight">
          <router-link to="/detailed" class="router"> Детальный анализ</router-link>
        </button>

        <button class="btn btn-bright">
          <router-link to="/selector" class="router"> Поверхностный анализ</router-link>
        </button>
      </div>
    </div>

    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {AppFooter, AppHeader},
}
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}



.navbar__link:hover {
  background-color: #f2a1d1; /* Slightly contrasting hover effect */
}

.home-page {
  padding: 20px;
  text-align: center;
  flex-grow: 1;
}

.welcome-text {
  font-size: 1.2rem;
  color: #666666; /* Soft gray text color */
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
}

.btn-bright {
  background-color: #E9CEC1; /* Bright pastel blue */
  color: white;
}

.btn-fight {
  background-color: #a8d0e6; /* Bright pastel blue */
  color: white;
}

.btn-light {
  background-color: #f0e4d7; /* Calm pastel beige */
  color: #333;
}

.footer p {
  margin: 0;
}
</style>
