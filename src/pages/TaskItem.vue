<template>
  <section class="task-card">
    <h5>{{ task.title }}</h5>
    <h6>{{ task.description.title }}</h6>
    <h6>{{ task.description.timeToBeCompleted }}</h6>
    <ul>
      <li v-for="(extraInfo, index) in task.description.extraInfoRequired" :key="index">
        {{ extraInfo }}
      </li>
    </ul>
    <h6>{{ task.isCompleted ? "Completed" : "Incomplete" }}</h6>
    <button :disabled="task.isCompleted" @click="$emit('markCompleted', task.id)">
      Mark as Completed
    </button>
    <button @click="$emit('delete', task.id)">Delete Task</button>
  </section>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

button {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
