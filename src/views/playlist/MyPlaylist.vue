<template>
  <div class="my-playlists">
    <h2 class="text-center">Mes Playlists:</h2>
    <hr />
    <div v-if="playlists">
      <ul v-for="playlist in playlists" :key="playlist.id">
        <router-link :to="{ name: 'Details', params: { id: playlist.id } }">
          <li class="single">
            <ul v-if="playlists">
              <li class="listItem">
                <h4>{{ playlist.title }}</h4>
                <div class="playlistImg">
                  <img :src="playlist.imgUrl" alt="" />
                </div>
              </li>
            </ul>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import getCollection from "@/services/getCollection";
import getUser from "@/services/getUser";
import Playlist from "../../components/Playlist.vue";

export default {
  components: { Playlist },
  setup() {
    const { user } = getUser();
    console.log(user.value.uid);
    const { docs: playlists } = getCollection("playlist", [
      "userId",
      "==",
      user.value.uid,
    ]);
    console.log(playlists);
    return { playlists };
  },
};
</script>

<style scoped>
h2 {
  margin: 30px auto;
  color: #333 !important;
}
</style>