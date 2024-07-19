<template>
  <div>
    <h4>This Page Displays all tasks</h4>
    <div class="container">
      <select v-model="sortOption" @change="sortTasks">
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="completion">Completion</option>
      </select>
      <ul v-if="sortedTasks.length > 0">
        <li v-for="task in sortedTasks" :key="task.id">
          <TaskItem :task="task" />
        </li>
      </ul>
      <p v-else>No tasks available</p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import TaskItem from '../pages/TaskItem.vue';

export default {
  components: { TaskItem },
  setup() {
    const taskStore = useTaskStore();
    const sortOption = ref('dueDate');

    const sortedTasks = computed(() => {
      let tasksArray = taskStore.tasks;
      if (sortOption.value === 'dueDate') {
        return tasksArray.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else if (sortOption.value === 'priority') {
        const priorityMap = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return tasksArray.slice().sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
      } else if (sortOption.value === 'completion') {
        return tasksArray.slice().sort((a, b) => a.isCompleted - b.isCompleted);
      }
      return tasksArray;
    });

    const sortTasks = () => {
      sortedTasks.value;
    };

    return {
      sortOption,
      sortedTasks,
      sortTasks,
    };
  },
};
</script>
