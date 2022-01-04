<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>Se connecter</h2>
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Mot de passe" v-model="password" />
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div class="btn-container">
        <button v-if="!isLoading" class="btn-main">Se connecter</button>
        <button v-if="isLoading" class="btn-main">Proceed.....</button>
      </div>
    </form>
  </div>
</template>

<script>
import useLogin from "@/services/useLogin";

import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isLoading } = useLogin();
    const router = useRouter();

    const email = ref("");
    const password = ref("");

    const submitForm = async () => {
      const response = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home" });
        console.log("logged in");
      }
    };

    return { email, password, submitForm, error, isLoading };
  },
};
</script>

<style>
.error {
  color: white;
  text-align: center;
  margin-bottom: 20px;
}
h2 {
  text-align: center;
  color: #f4f4f4;
  margin-bottom: 20px;
}
form {
  max-width: 600px;
  margin: 60px auto;
  padding: 60px;
  background: var(--third-color);
  border-radius: 30px;
}
input {
  display: block;
  width: 80%;
  margin: 0 auto 20px auto;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
}
</style>