import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTaskStore } from './taskStore';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const profile = ref(null);
  const isLoggedIn = ref(false);

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  function fetchUser() {
    user.value = getFromLocalStorage('user');
    profile.value = getFromLocalStorage('profile');
    if (user.value) {
      isLoggedIn.value = true;
    }
  }

  function register(email, password) {
    const newUser = { id: user.value?.id ?? Date.now(), email, password };
    user.value = newUser;
    saveToLocalStorage('user', newUser);
    const newProfile = { user_id: newUser.id, username: email };
    profile.value = newProfile;
    saveToLocalStorage('profile', newProfile);
  }

  function signIn(email, password) {
    let storedUser = getFromLocalStorage('user');
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      user.value = storedUser;
      profile.value = getFromLocalStorage('profile');
      isLoggedIn.value = true;
    } else {
      throw new Error('User not found or password incorrect');
    }
  }

  function signOut() {
    user.value = null;
    profile.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  }

  function updateUserProfile(email, password) {
    if (user.value) {
      user.value.email = email;
      user.value.password = password;
      saveToLocalStorage('user', user.value);
    } else {
      throw new Error('No user logged in');
    }
  }

  function getTasksForUser() {
    const taskStore = useTaskStore();
    return taskStore.getTasksByUserId(user.value.id);
  }

  return {
    user,
    profile,
    isLoggedIn,
    fetchUser,
    register,
    signIn,
    signOut,
    updateUserProfile,
    getTasksForUser,
  };
});
