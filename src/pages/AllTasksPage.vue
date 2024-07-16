<!--
This file defines a Vue.js component for displaying and managing tasks in a to-do application.
By building this component, we will achieve a user interface that shows a list of all tasks,
allowing users to mark tasks as completed and delete them, leveraging global state management with Pinia.js.
-->

<template>
  <h4>This Page Displays all tasks</h4>

  <div class="container">
    <ul v-if="userTasks.length > 0">
      <task-item
        v-for="task in userTasks"
        :key="task.id"
        :task="task"
        @markCompleted="markTaskCompleted"
        @delete="deleteTask"
      />
    </ul>
    <ul v-else>
      <task-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @markCompleted="markTaskCompleted"
        @delete="deleteTask"
      />
    </ul>
  </div>
</template>


<script setup>
// Import Block
import { computed } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useUserStore } from "../stores/user";
import TaskItem from "./TaskItem.vue"; // Import the new TaskItem component

// Store Access Block
const taskstore = useTaskStore();
const userStore = useUserStore();
const { tasks, deleteTask, markTaskCompleted, getTasksByUserId } = taskstore;

// Functions Block
const userTasks = computed(() => {
  if (userStore.isLoggedIn && userStore.user) {
    return getTasksByUserId(userStore.user.id);
  }
  return [];
});
</script>


<style scoped>
.container button {
  display: block;
  margin-bottom: 0.5rem;
}
</style>


<!--
Summary:
This file implements a Vue.js component that displays a list of tasks from the global state managed by Pinia.js.
It allows users to mark tasks as completed or delete them. The component leverages Pinia's state management to
interact with the tasks and provide necessary functionalities.
-->