<template>
  <div class="add-songs">
    <button v-if="!showForm" @click="showForm = true" class="btn-second">
      Ajouter une chanson
    </button>
    <form @submit.prevent="submitForm" v-if="showForm">
      <h2>Ajouter des chansons :</h2>
      <input type="text" placeholder="Titre" required v-model="title" />
      <input type="text" placeholder="Artist(s)" v-model="artist" />
      <div class="btn-container">
        <button type="submit" class="btn-second">Ajouter</button>
        <br />
        <button @click="showForm = false" class="btn-second annuler">
          Annuler X
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);

    const submitForm = async () => {
      const song = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 100000),
      };
      console.log(song);
    };

    return { title, artist, showForm, submitForm };
  },
};
</script>

<style scoped>
form {
  padding-bottom: 30px;
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
  margin-top: 10px;
}
</style>