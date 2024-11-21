<template>
  <div class="image-slider">
    <button @click="prev" class="slider-button">❮</button>
    <img :src="currentImage" class="slider-image" alt="Product Image" />
    <button @click="next" class="slider-button">❯</button>
  </div>
</template>

<script>
import {computed, ref} from 'vue';

export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const currentIndex = ref(0);

    const currentImage = computed(() => props.images[currentIndex.value]);

    const next = () => {
      if (currentIndex.value < props.images.length - 1) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0; // Циклический слайдер
      }
    };

    const prev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      } else {
        currentIndex.value = props.images.length - 1; // Циклический слайдер
      }
    };

    return { currentImage, next, prev };
  }
};
</script>

<style scoped>
.image-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Слайдер занимает всю ширину контейнера */
  max-width: 500px; /* Ограничиваем максимальную ширину */
  margin: auto; /* Центрируем слайдер */
}

.slider-image {
  max-width: 100%;
  max-height: 400px; /* Задаем фиксированную высоту */
  object-fit: contain; /* Контент вписывается в размеры */
}

.slider-button {
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: #333;
}

.slider-button:hover {
  color: #555;
}
</style>
