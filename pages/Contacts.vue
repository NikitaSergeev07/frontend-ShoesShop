<template>
  <AppHeader></AppHeader>
  <main class="contact-page">
    <div class="content-container">
      <h1 class="contact-title">Контакты</h1>
      <p class="contact-intro">Мы всегда рады вашим вопросам, предложениям и отзывам! Пожалуйста, свяжитесь с нами любым удобным способом, и мы постараемся ответить вам в кратчайшие сроки.</p>

      <section class="contact-info">
        <h2 class="section-title">Наши контакты</h2>
        <ul class="contact-list">
          <li><strong>Адрес:</strong> 630039, г. Новосибирск, ул. Автогенная 132 к2. Ближайшая остановка транспорта — "Сад Мичуринцев".</li>
          <li><strong>Время работы:</strong> Понедельник-Пятница с 5:00 до 11:00 (московское время), Сб-Вс — выходной.</li>
          <li><strong>Пункты выдачи:</strong> пр. Дзержинского, д. 28. Понедельник-Суббота с 12:00 до 19:00 (время новосибирское), Воскресенье - выходной.</li>
          <li><strong>Контактный телефон:</strong> <a href="tel:+78043337126">8 (804) 333-71-26</a> (бесплатная линия)</li>
          <li><strong>Альтернативный номер:</strong> <a href="tel:+79139173880">+7-913-917-38-80</a></li>
          <li><strong>Электронная почта:</strong> <a href="mailto:2642395@mail.ru">2642395@mail.ru</a></li>
        </ul>
      </section>

      <section class="map-section">
        <h2 class="section-title">Карта</h2>
        <div class="yandex-map">
          <iframe
              src="https://yandex.ru/map-widget/v1/?ll=82.988836%2C55.024755&z=16&pt=82.988836,55.024755,pm2rdl"
              width="100%"
              height="400"
              frameborder="0"
              allowfullscreen="true"
          ></iframe>
        </div>
      </section>

      <section class="contact-form-section">
        <h2 class="section-title">Форма обратной связи</h2>
        <p>Вы также можете отправить нам сообщение, заполнив форму ниже:</p>
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Ваше имя:</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="email">Ваша почта:</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="message">Ваше сообщение:</label>
            <textarea id="message" v-model="form.message" rows="4" required></textarea>
          </div>
          <button class="form__button">Отправить</button>
        </form>
      </section>
    </div>
  </main>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: 'ContactPage',
  components: {AppFooter, AppHeader},
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
      // Здесь можно добавить логику для отправки формы
      alert('Форма отправлена!'); // для примера
    },
  },
};
</script>

<style scoped lang="scss">
.contact-page {
  padding: 40px 20px;
  background-color: #f9fafb; /* Светлый фон страницы */
}

.content-container {
  max-width: 1000px; /* Ограничиваем максимальную ширину */
  margin: 0 auto; /* Центрируем содержимое */
  padding: 20px;
  background-color: white; /* Белый фон для контента */
  border-radius: 8px; /* Закругленные углы */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Тень */
}

.contact-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.contact-intro {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
}

.contact-info {
  .section-title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  .contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    color: #555;

    li {
      margin-bottom: 10px;
    }

    a {
      color: #1d4ed8;
      text-decoration: none;
    }
  }
}

.map-section {
  margin-top: 40px;
}

.contact-form-section {
  margin-top: 40px;
  .section-title {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .form-group {
      display: flex;
      flex-direction: column;

      label {
        font-size: 1rem;
        color: #333;
      }

      input,
      textarea {
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-top: 5px;
      }

      textarea {
        resize: vertical;
      }
    }

    .submit-btn {
      padding: 10px 20px;
      background-color: #1d4ed8;
      color: white;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .submit-btn:hover {
      background-color: #1e40af;
    }
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .contact-title {
    font-size: 1.5rem;
  }

  .contact-intro {
    font-size: 0.9rem;
  }

  .contact-form {
    gap: 10px;
  }

  .submit-btn {
    font-size: 0.9rem;
  }
}
</style>
