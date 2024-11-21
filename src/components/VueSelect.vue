<template>
  <div class="vue-select">
    <input
        type="text"
        v-model="searchQuery"
        @input="onSearchInput"
        placeholder="Выберите продукт..."
        class="vue-select__input"
    />
    <div v-if="filteredItems.length > 0" class="vue-select__dropdown">
      <div
          v-for="item in filteredItems"
          :key="item.id"
          class="vue-select__dropdown-item"
          @click="selectItem(item)"
      >
        <img :src="item.image_urls[0]" :alt="item.title" class="vue-select__item-image" />
        <span class="vue-select__item-title">{{ item.title }}</span>
      </div>
    </div>
    <div v-else class="vue-select__no-results">
      Нет совпадений
    </div>
  </div>
</template>

<script>
export default {
  name: "VueSelect",
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: [Number],
      default: null,
    },
  },
  data() {
    return {
      searchQuery: "",
      selectedItem: null,
    };
  },
  computed: {
    filteredItems() {
      if (!this.searchQuery) {
        return this.items;
      }
      return this.items.filter((item) =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    onSearchInput() {
      // Можно добавить debounce
    },
    selectItem(item) {
      this.selectedItem = item;
      this.searchQuery = item.title;
      console.log("Emitting productId with value:", this.selectedItem.id); // Лог для проверки
      this.$emit("productId", this.selectedItem.id);
    }
  },
};
</script>

<style scoped>
.vue-select {
  position: relative;
  width: 100%;
}

.vue-select__input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.vue-select__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.vue-select__dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.vue-select__dropdown-item:hover {
  background-color: #f0f0f0;
}

.vue-select__item-image {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
}

.vue-select__item-title {
  font-size: 0.9em;
  color: #333;
}

.vue-select__no-results {
  padding: 10px;
  color: #aaa;
  font-size: 0.9em;
}
</style>
