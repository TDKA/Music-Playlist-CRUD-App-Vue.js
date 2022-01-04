<template>
  <div class="add-songs">
    <button v-if="!showForm" @click="showForm = true" class="btn-second">
      Ajouter une chanson
    </button>
    <form @submit.prevent="submitForm" v-if="showForm">
      <a @click="showForm = false" class="annuler">
        <i class="fas fa-times"></i>
      </a>
      <h2>Ajouter des chansons :</h2>
      <input type="text" placeholder="Titre" required v-model="title" />
      <input type="text" placeholder="Artist(s)" v-model="artist" />
      <div class="btn-container">
        <button type="submit" class="btn-second">Ajouter</button>
        <br />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useDocument from "@/services/useDocument";
export default {
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const { updateDoc } = useDocument("playlist", props.playlist.id);

    const submitForm = async () => {
      const song = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 100000),
      };
      console.log(song);
      await updateDoc({
        songs: [...props.playlist.songs, song],
      });
      title.value = "";
      artist.value = "";
    };

    return { title, artist, showForm, submitForm };
  },
};
</script>

<style scoped>
form {
  padding-bottom: 30px;
  margin-top: 0;
}
h2 {
  margin: 0 auto;
  text-align: center;
  color: var(--second-color) !important;
  margin-bottom: 14px;
}
.add-songs {
  text-align: center;
}
.annuler {
  position: relative;
  margin: 0 auto;
}
.fa-times {
  color: white !important;
  font-size: 34px;
  position: absolute;

  top: -40px;
  transition: 0.1s ease-in all;
}
.fa-times:hover {
  font-size: 40px;
}
</style>