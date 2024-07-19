<template>
  <h4>This Page Displays completed tasks</h4>
  <div class="container">
    <!-- Display EXAMPLE TASKS THAT BELONG TO THE USER -->
    <ul v-if="userCompletedTasks.length > 0">
      <!-- Loop through the completedTasks array and render each task -->
      <li v-for="task in userCompletedTasks" :key="task.id">
        <!-- Display the task using TaskItem component -->
        <TaskItem :task="task" />
      </li>
    </ul>
    <!-- Display EXAMPLE TASKS THAT DO NOT BELONG TO THE USER -->
    <ul v-else>
      <!-- Loop through the completedTasks array and render each task -->
      <li v-for="task in completedTasks" :key="task.id">
        <!-- Display the task using TaskItem component -->
        <TaskItem :task="task" />
      </li>
    </ul>
  </div>
</template>

<script setup>
// Import computed from Vue to create a computed property
import { computed } from "vue";
// Import the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";
// Import the useUserStore function from userStore to interact with the user store
import { useUserStore } from "../stores/user";
// Import TaskItem component from pages directory
import TaskItem from '../pages/TaskItem.vue';

// Use the task store by saving it in a variable
const taskstore = useTaskStore();
// Use the user store by saving it in a variable
const userStore = useUserStore();

// Destructure all the possible pieces of data that we want out of this
const { tasks, getTasksByUserId } = taskstore; // Destructure necessary functions and state from the task store

// Computed property to filter completed tasks
const completedTasks = computed(() => tasks.filter((task) => task.isCompleted));

// Computed property to get completed tasks for the current user
const userCompletedTasks = computed(() => {
  if (userStore.isLoggedIn && userStore.user) {
    return getTasksByUserId(userStore.user.id).filter(
      (task) => task.isCompleted
    );
  }
  return [];
});
</script>

<style scoped>
/* Add any additional styling if needed, but using the same container class as the All Tasks page should suffice */
.container {
  padding: 2rem;
  margin-top: 2rem;
  background: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
