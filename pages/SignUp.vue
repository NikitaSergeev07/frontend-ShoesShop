<template>
  <div class="sign-up wrapper">
    <h1 class="headline sign-up__headline">Регистрация</h1>

    <div class="form-container">
      <form class="form sign-up__form" @submit.prevent="signUp">
        <!-- Поля формы -->
        <div class="form-group">
          <label class="input-wrapper">Полное имя
            <i class="bi bi-question-circle-fill" v-tooltip data-bs-toggle="tooltip" data-bs-placement="bottom"
               data-bs-title="Field must contains 2 words, 3+ symbols"></i>
            <input type="text" class="form-control" v-model="form.username" name="username" @blur="validateName"
                   :class="{ error: error.username }" />
          </label>
          <p v-if="error.username" class="error-message"> Введите имя правильно</p>
        </div>

        <div class="form-group">
          <label class="input-wrapper">Почта
            <input type="email" class="form-control" v-model="form.email" name="email" @blur="validateEmail"
                   :class="{ error: error.email }" />
          </label>
          <p v-if="error.email" class="error-message"> Введите валидную почту </p>
        </div>

        <div class="form-group">
          <label class="input-wrapper">Пароль
            <i class="bi bi-question-circle-fill" v-tooltip data-bs-toggle="tooltip" data-bs-placement="bottom"
               data-bs-title="Field must contains 8+ symbols, 1 special and 2 capital letters"></i>
            <input type="password" class="form-control" v-model="form.password" name='password'
                   @blur="validatePassword" :class="{ error: error.password }" />
            <i class="bi bi-eye-slash icon" @click="setVisibility"></i>
          </label>
          <p v-if="error.password" class="error-message"> Введите валидный пароль </p>
        </div>

        <div class="form-group">
          <label for="inputConfirmPassword" class="input-wrapper">Повторите пароль
            <input type="password" class="form-control" v-model="form.repeatPassword" name="repeatPassword"
                   @blur="validateConfirmPassword" :class="{ error: error.repeatPassword }" />
            <i class="bi bi-eye-slash icon" @click="setVisibility"></i>
          </label>
          <p v-if="error.repeatPassword" class="error-message"> Пароли не совпадают</p>
        </div>

        <button type="submit" class="btn form__button">Войти </button>
      </form>
    </div>

    <div class="options sign-up__options">
      <p class="options__description">Уже есть аккаунт?</p>
      <router-link class="options__link" to="/sign-in"> Войти </router-link>
    </div>
  </div>
</template>


<script>
import { isValidName, isValidEmail, isValidPassword, isValidRepeatPasswod } from '../utils/validation.js';
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
      },
      error: {
        username: false,
        email: false,
        password: false,
        repeatPassword: false,
      }
    }
  },
  methods: {
    setVisibility(e) {
      const getSel = e.target;
      const getInput = getSel.previousSibling;

      if (getInput.type === "password") {
        getInput.type = "text";
        getSel.classList.remove("bi-eye-slash");
        getSel.classList.add("bi-eye");
      }
      else {
        getInput.type = "password";
        getSel.classList.remove("bi-eye");
        getSel.classList.add("bi-eye-slash");
      }
    },
    addClassInvalid(attr) {
      const getSel = document.querySelector(`input[name="${attr}"]`);
      getSel.classList.add('invalid');
      this.error[attr] = true;
    },

    removeClassInvalid(attr) {
      const getSel = document.querySelector(`input[name="${attr}"]`);
      getSel.classList.remove('invalid');
      this.error[attr] = false;
    },

    validateName() {
      const attr = 'username'
      if (this.form[attr].length !== 0) {
        !isValidName(this.form[attr]) ? this.addClassInvalid(attr) : this.removeClassInvalid(attr);
      }
    },
    validateEmail() {
      const attr = 'email';
      if (this.form[attr].length !== 0) {
        !isValidEmail(this.form[attr]) ? this.addClassInvalid(attr) : this.removeClassInvalid(attr);
      }
    },
    validatePassword() {
      const attr = 'password'
      if (this.form[attr].length !== 0) {
        !isValidPassword(this.form[attr]) ? this.addClassInvalid(attr) : this.removeClassInvalid(attr);
      }
    },
    validateConfirmPassword() {
      const attr = 'repeatPassword';
      const password = 'password';
      if (this.form[attr].length !== 0) {
        !isValidRepeatPasswod(this.form[attr], this.form[password]) ? this.addClassInvalid(attr) : this.removeClassInvalid(attr);
      }
    },
    async signUp() {
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();

      const hasErrors = Object.values(this.error).some(err => err);
      if (!hasErrors && this.form.username && this.form.email && this.form.password && this.form.repeatPassword) {
        try {
          const response = await axios.post('http://localhost:8000/auth/sign-up', {
            Email: this.form.email,
            Name: this.form.username,
            Password: this.form.password
          });
          console.log('Sign-up successful:', response.data);
          this.$router.push('/home');
        } catch (error) {
          console.error('Error during sign-up:', error.response ? error.response.data : error.message);
        }
      }
    },
  }
}
</script>

<style scoped>
.sign-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ensures full height of the viewport */
  text-align: center; /* Centers the text inside the container */
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.form {
  width: 100%; /* Makes the form stretch to full width */
  max-width: 400px; /* Limits the form width */
}

.form__button {
  width: auto;
  padding: 10px 20px; /* Custom padding for the button */
}

.headline {
  margin-bottom: 20px; /* Space below the headline */
  font-size: 2rem; /* Adjust the font size of the headline if necessary */
}


</style>
