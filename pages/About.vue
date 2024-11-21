<template>
  <AppHeader></AppHeader>
  <div class="about">
    <div class="about-container">
      <h1 class="about-title">О компании</h1>

      <section class="about-section">
        <h2 class="section-title">Компания «Сити-Класс»</h2>
        <p class="section-text">
          Компания «Сити-Класс» была основана в 2005 году и с тех пор зарекомендовала себя как надежный продавец обуви высокого качества для всей семьи.
        </p>
      </section>

      <section class="about-section">
        <h2 class="section-title">Технологическое развитие</h2>
        <p class="section-text">
          С 2006 года мы активно внедряем новые технологии, чтобы улучшить качество и долговечность нашей обуви. Благодаря современным автоматизированным производственным линиям и инновационным материалам, мы можем предложить клиентам продукцию, которая сочетает комфорт и стиль, устойчивость и экологичность.
        </p>
      </section>

      <section class="about-section">
        <h2 class="section-title">Партнерство и инновации</h2>
        <p class="section-text">
          «Сити-Класс» гордится партнерством с ведущими производителями обуви в Европе и Азии. Мы следим за мировыми тенденциями моды, а также внедряем экологически чистые материалы, которые делают обувь удобной и долговечной. Вся наша продукция соответствует самым высоким стандартам качества.
        </p>
      </section>

      <section class="about-section">
        <h2 class="section-title">Новые коллекции</h2>
        <p class="section-text">
          Мы постоянно обновляем наш ассортимент и выпускаем новые коллекции с учетом современных тенденций. Каждый сезон в нашем каталоге появляются стильные и практичные модели, разработанные с учетом пожеланий наших клиентов.
        </p>
      </section>

      <section class="about-section">
        <h2 class="section-title">Наши флагманские модели</h2>
        <ul class="flagship-list">
          <li>Обувь для активного отдыха</li>
          <li>Классические туфли и ботинки для офиса</li>
          <li>Теплые зимние сапоги и ботинки</li>
          <li>Легкие и удобные летние сандалии</li>
          <li>Спортивная обувь для тренировок</li>
        </ul>
      </section>

      <section class="about-section">
        <h2 class="section-title">Присутствие на рынке</h2>
        <p class="section-text">
          Продукция компании «Сити-Класс» представлена более чем в 50 городах России и доступна во всех крупных федеральных и локальных торговых сетях. Мы работаем для того, чтобы качественная и стильная обувь была доступна каждому.
        </p>
      </section>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: 'AboutPage',
  components: {AppFooter, AppHeader}
};
</script>

<style scoped>
.about {
  padding: 20px;
  background-color: #f4f4f4;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #1f2937;
  margin-bottom: 20px;
}

.about-section {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 28px;
  color: #1f2937;
  margin-bottom: 10px;
}

.section-text {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.5;
}

.flagship-list {
  list-style: none;
  padding: 0;
}

.flagship-list li {
  font-size: 16px;
  color: #4b5563;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .about-container {
    padding: 10px;
  }

  .about-title {
    font-size: 30px;
  }

  .section-title {
    font-size: 24px;
  }

  .section-text {
    font-size: 14px;
  }
}
</style>
