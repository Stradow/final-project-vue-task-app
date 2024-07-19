<template>
  <div class="container">
    <h3 class="header-title">User Profile</h3>
    <form @submit.prevent="updateProfile" class="form-profile">
      <div class="form-input">
        <label class="input-field-label">E-mail</label>
        <input type="email" class="input-field" v-model="formState.email" required />
      </div>
      <div class="form-input">
        <label class="input-field-label">Password</label>
        <div class="password-wrapper">
          <input :type="passwordFieldType" class="input-field" v-model="formState.password" required />
          <font-awesome-icon
            :icon="passwordFieldType === 'password' ? 'eye' : 'eye-slash'"
            @click="togglePasswordVisibility"
            class="password-toggle-icon"
          />
        </div>
      </div>
      <button class="button" type="submit">Update Profile</button>
    </form>
    <div v-show="formState.errorMsg">{{ formState.errorMsg }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add Font Awesome icons to the library
library.add(faEye, faEyeSlash);

const router = useRouter();
const userStore = useUserStore();
const { user } = userStore;

const formState = reactive({
  email: user.value?.email ?? '',
  password: '',
  errorMsg: '',
});

const passwordFieldType = ref('password');

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const updateProfile = () => {
  try {
    userStore.updateUserProfile(formState.email, formState.password);
    router.push({ path: '/' });
  } catch (error) {
    formState.errorMsg = error.message;
    setTimeout(() => {
      formState.errorMsg = '';
    }, 5000);
  }
};
</script>

<style scoped>
label,
input {
  display: block;
  width: 100%;
}

button {
  margin: 0.5rem 0;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 100%;
  box-sizing: border-box;
  padding-right: 2rem;
}

.password-toggle-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #ccc;
}
</style>
