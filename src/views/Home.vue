<template>
  <div class="home">
    <div v-if="error">N'a pas pu récupérer les données</div>
    <Playlist />
  </div>
</template>

<script>
// @ is an alias to /src
import getCollection from "@/services/getCollection";
import Playlist from "../components/Playlist.vue";

export default {
  components: { Playlist },
};
</script>
