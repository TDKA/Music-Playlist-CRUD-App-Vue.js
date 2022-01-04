<template>
  <header>
    <nav>
      <h1>myMusic</h1>
      <ul>
        <div v-if="!user">
          <li><router-link :to="{ name: 'Home' }">Accueil</router-link></li>
          <li>
            <router-link :to="{ name: 'Login' }">Se connecter</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'SignUp' }">S'inscrire</router-link>
          </li>
        </div>
        <div v-else>
          <li><router-link :to="{ name: 'Home' }">Accueil</router-link></li>
          <li>
            <router-link :to="{ name: 'Create' }">Créer playlist</router-link>
          </li>
          <li><a @click="logOut">Se déconnecter</a></li>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import useLogout from "@/services/useLogout";
import getUser from "@/services/getUser";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    const logOut = async () => {
      await logout();
      router.push({ name: "Login" });
      console.log("loggedout");
    };

    return { useLogout, logOut, user };
  },
};
</script>

<style>
header {
  background: var(--second-color);
  padding: 0 20px;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
ul div {
  display: flex;
}
li {
  margin-left: 30px;
  list-style: none;
}
a {
  transition: 0.7s ease-in-out;
  cursor: pointer;
}
li a:hover {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(141, 16, 141, 0.4));
  padding: 15px 27px;
  border: none;
  border-radius: 30px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
  color: aliceblue;
}
</style>