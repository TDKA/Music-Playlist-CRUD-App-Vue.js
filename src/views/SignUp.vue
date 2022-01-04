<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>S'inscrire</h2>
      <input type="email" placeholder="Email" v-model="email" />
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        v-model="displayName"
      />
      <input type="password" placeholder="Mot de passe" v-model="password" />
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div class="btn-container">
        <button v-if="!isLoading" class="btn-main">S'inscire</button>
        <button v-if="isLoading" class="btn-main">Proceed.....</button>
      </div>
    </form>
  </div>
</template>

<script>
import useSignup from "@/services/useSignup";
import { ref } from "vue";

export default {
  setup() {
    const { error, signup, isLoading } = useSignup();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");

    const submitForm = async () => {
      const response = await signup(
        email.value,
        password.value,
        displayName.value
      );
      if (!error.value) {
        console.log("signed up");
      }
    };

    return { email, password, submitForm, error, isLoading, displayName };
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
  background: linear-gradient(
    rgba(170, 20, 240, 0.774),
    rgba(188, 140, 242, 0.712)
  );
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

.btn-container {
  text-align: center;
}
</style>