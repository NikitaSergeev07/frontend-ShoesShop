<template>
  <header class="header">
    <div class="flex items-center gap-4">
      <router-link to="/home">
        <img src="/logo.png" alt="Logo" class="w-11 cursor-pointer" />
      </router-link>
      <div>
        <h2 class="font-bold text-xl uppercase">Сити-Класс</h2>
        <p class="text-slate-400">Лучший магазин обуви</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-3 cursor-pointer">
        <img src="/cart.svg" alt="Cart" />
        <b>1205 руб.</b>
      </li>
      <li class="flex items-center gap-3 cursor-pointer">
        <img src="/heart.svg" alt="Favorite" />
        <span>Закладки</span>
      </li>
      <li class="flex items-center gap-3 cursor-pointer" @click="showLogoutModal">
        <img src="/profile.svg" alt="Favorite" />
        <span>Выйти из аккаунта</span>
      </li>
    </ul>

    <ModalWindow
        ref="confirmationModal"
        @confirm="logout"
    />
  </header>
</template>

<script>
import ModalWindow from "@/components/ModalWindow.vue";
import store from "../../store"

export default {
  components: {
    ModalWindow
  },
  methods: {
    showLogoutModal() {
      this.$refs.confirmationModal.openModal();
    },
    logout() {
      store.dispatch('logout');

      sessionStorage.removeItem('userId');
      sessionStorage.removeItem("authToken");
      this.$router.push("/");
    }
  }
};
</script>
