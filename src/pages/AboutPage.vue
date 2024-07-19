<template>
  <div class="container">
    <h4>About View</h4>
    <button @click="incrementCounter">Add +1</button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const counter = ref(0);

    const incrementCounter = () => {
      counter.value += 1;
    };

    return {
      counter,
      incrementCounter,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 2rem;
  margin-top: 2rem;
  background: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

button {
  background-color: hsla(160, 100%, 37%, 1);
  color: var(--vt-c-white);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: hsla(160, 100%, 42%, 1);
}
</style>
