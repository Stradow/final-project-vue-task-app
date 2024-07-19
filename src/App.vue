<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="ToDo App" />
      <nav>
        <template v-if="!isLoggedIn">
          <RouterLink to="/auth/login">Login</RouterLink>
          <RouterLink to="/auth/register">Register</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/all-tasks">All Tasks</RouterLink>
          <RouterLink to="/completed-tasks">Completed Tasks</RouterLink>
          <RouterLink to="/add-task">Add New Task</RouterLink>
          <RouterLink to="/profile">Profile</RouterLink> <!-- Add this line -->
          <button @click="handleSignOut">Sign Out</button>
        </template>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "../src/stores/user";

const router = useRouter();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const isUserloggedIn = ref(false);

onMounted(() => {
  try {
    userStore.fetchUser();
    if (!user.value) {
      router.push({ path: "/auth/login" });
    } else {
      isUserloggedIn.value = true;
      router.push({ path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
});

let handleSignOut = () => {
  userStore.signOut();
  router.push({ path: "/auth/login" });
  isUserloggedIn.value = false;
};
</script>

<style scoped>
/* Add your styles here */
</style>
