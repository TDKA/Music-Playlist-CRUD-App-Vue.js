<template>
  <header>
    <nav id="navbar" class="navbar navbar-expand-lg">
      <div class="container py-3">
        <h3>myMusic</h3>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="
            collapse
            navbar-collapse
            justify-content-end
            align-items-center
          "
          id="navbarNav"
        >
          <ul class="navbar-nav align-items-center text-center" v-if="!user">
            <li class="nav-item me-lg-3">
              <router-link :to="{ name: 'Home' }" class="links"
                >Accueil</router-link
              >
            </li>
            <li class="nav-item me-lg-3">
              <router-link :to="{ name: 'Login' }" class="links"
                >Se connecter</router-link
              >
            </li>
            <li class="nav-item me-lg-3">
              <router-link :to="{ name: 'SignUp' }" class="links"
                >S'inscrire</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav align-items-center text-center" v-else>
            <li class="nav-item me-lg-3">
              <router-link :to="{ name: 'Home' }" class="links"
                >Accueil</router-link
              >
            </li>
            <li class="nav-item me-lg-3">
              <router-link :to="{ name: 'MyPlaylist' }"
                >Mes playlists</router-link
              >
            </li>
            <li class="nav-item me-lg-3">
              <router-link :to="{ name: 'Create' }" class="links"
                >Créer playlist</router-link
              >
            </li>
            <li class="nav-item me-lg-3">
              <a @click="logOut" class="links">Se déconnecter</a>
            </li>
          </ul>
        </div>
        <!-- <nav class="navbar">
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
            <router-link :to="{ name: 'MyPlaylist' }"
              >Mes playlists</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Create' }">Créer playlist</router-link>
          </li>
          <li><a @click="logOut">Se déconnecter</a></li>
        </div>
      </ul>
    </nav> -->
      </div>
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
/******* BURGER ************ */

.navbar-toggler {
  border: none;
  outline: none !important;
}
.navbar-toggler-icon {
  background-image: none;
}
.navbar-toggler-icon {
  transition: all 0.3s ease;
  /* espace de travail pour les ::before et ::after */
  position: relative;
  /* style de la barre du milieu */
  width: 40px;
  height: 3px;
  background: -webkit-linear-gradient(25deg, #b24592, #f15f79 95%);
}

/* Style pour les barres du haut et du bas */
.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  transition: all 0.3s ease;
  content: "";
  position: absolute;
  width: 40px;
  height: 3px;
  background: -webkit-linear-gradient(25deg, #b24592, #f15f79 95%);
  left: 0;
}

.navbar-toggler-icon::before {
  top: -10px;
}

.navbar-toggler-icon::after {
  top: 10px;
}

button[aria-expanded="true"] .navbar-toggler-icon {
  background: transparent;
}
button[aria-expanded="true"] .navbar-toggler-icon::before {
  top: 0;
  transform: rotate(45deg);
}
button[aria-expanded="true"] .navbar-toggler-icon::after {
  top: 0;
  transform: rotate(-45deg);
}

.links {
  color: #333 !important;
}
</style>