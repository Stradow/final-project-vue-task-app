<template>
  <div class="task-item">
    <div v-if="!isEditing">
      <h5>{{ task.title }}</h5>
      <h6>{{ task.description.title }}</h6>
      <p>Time to be completed: {{ task.description.timeToBeCompleted }}</p>
      <ul>
        <li v-for="(extraInfo, index) in task.description.extraInfoRequired" :key="index">
          {{ extraInfo }}
        </li>
      </ul>
      <p>{{ task.isCompleted ? 'Completed' : 'Incomplete' }}</p>
      <div class="buttons">
        <button @click="toggleTaskCompletion(task.id)">
          <span :class="{ completed: task.isCompleted }">{{ task.isCompleted ? 'Undo Complete' : 'Mark as Completed' }}</span>
        </button>
        <button @click="deleteTask(task.id)">Delete Task</button>
        <button @click="startEditing">Edit Task</button>
      </div>
    </div>
    <div v-else>
      <h5>Edit Task</h5>
      <input v-model="editTitle" placeholder="Task Title" />
      <input v-model="editDescription" placeholder="Task Description" />
      <input v-model="editTimeToBeCompleted" placeholder="Time to be completed" />
      <button @click="saveTask">Save</button>
      <button @click="cancelEditing">Cancel</button>
    </div>
    
    <!-- Subtasks Section -->
    <div class="subtasks">
      <h6>Subtasks</h6>
      <ul>
        <li v-for="subtask in task.subtasks" :key="subtask.id">
          <input type="checkbox" :checked="subtask.isCompleted" @change="markSubtaskCompleted(task.id, subtask.id)">
          <span>{{ subtask.title }}</span>
        </li>
      </ul>
      <input v-model="newSubtaskTitle" placeholder="New subtask title">
      <button @click="addSubtask(task.id)">Add Subtask</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

export default {
  props: ['task'],
  setup(props) {
    const taskStore = useTaskStore();
    const newSubtaskTitle = ref('');
    const isEditing = ref(false);
    const editTitle = ref(props.task.title);
    const editDescription = ref(props.task.description.title);
    const editTimeToBeCompleted = ref(props.task.description.timeToBeCompleted);

    const startEditing = () => {
      isEditing.value = true;
    };

    const cancelEditing = () => {
      isEditing.value = false;
    };

    const saveTask = () => {
      const updatedTask = {
        ...props.task,
        title: editTitle.value,
        description: {
          ...props.task.description,
          title: editDescription.value,
          timeToBeCompleted: editTimeToBeCompleted.value,
        },
      };
      taskStore.editTask(props.task.id, updatedTask);
      isEditing.value = false;
    };

    const addSubtask = (taskId) => {
      if (newSubtaskTitle.value.trim()) {
        const newSubtask = {
          id: Date.now(),
          title: newSubtaskTitle.value.trim(),
          isCompleted: false,
        };
        taskStore.addSubtask(taskId, newSubtask);
        newSubtaskTitle.value = '';
      }
    };

    const toggleTaskCompletion = (taskId) => {
      taskStore.toggleTaskCompletion(taskId);
    };

    const deleteTask = (taskId) => {
      taskStore.deleteTask(taskId);
    };

    const markSubtaskCompleted = (taskId, subtaskId) => {
      const task = taskStore.tasks.find(task => task.id === taskId);
      const subtask = task.subtasks.find(subtask => subtask.id === subtaskId);
      if (subtask) {
        subtask.isCompleted = !subtask.isCompleted;
      }
    };

    return {
      newSubtaskTitle,
      addSubtask,
      toggleTaskCompletion,
      deleteTask,
      markSubtaskCompleted,
      isEditing,
      editTitle,
      editDescription,
      editTimeToBeCompleted,
      startEditing,
      cancelEditing,
      saveTask,
    };
  },
};
</script>

<style scoped>
.task-item {
  background: #444; /* Dark background */
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: var(--color-text);
  border: 1px solid #555; /* Slightly darker border */
}

.completed {
  text-decoration: line-through;
}

.task-item h5 {
  margin: 0;
}

.task-item h6 {
  margin: 5px 0;
}

.task-item ul {
  padding-left: 20px;
}

.task-item .buttons {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.task-item button {
  background-color: hsla(160, 100%, 37%, 1);
  color: var(--vt-c-white);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-item button:hover {
  background-color: hsla(160, 100%, 42%, 1);
}

.subtasks {
  margin-top: 10px;
}

.subtasks input[type="text"] {
  margin-right: 10px;
}
</style>
