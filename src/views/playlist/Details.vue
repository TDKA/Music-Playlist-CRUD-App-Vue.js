<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="document" class="playlist">
    <div class="img-cover">
      <img :src="document.imgUrl" alt="" class="img" />
    </div>
    <div class="info-playlist">
      <h3>{{ document.title }}</h3>
      <p class="description">{{ document.description }}</p>
      <small class="username">
        <i>Créé par: {{ document.username }}</i>
      </small>
      <div class="delete-playlist">
        <button class="btn-second" @click="deletePlaylist">Supprimer</button>
      </div>
    </div>
  </div>
  <div class="songs">
    <AddSongs v-if="isOwner" :playlist="playlist" />
  </div>
</template>

<script>
import getDocument from "../../services/getDocument";
import getUser from "@/services/getUser";
import { computed } from "@vue/reactivity";
import useDocument from "@/services/useDocument";
import { useRouter } from "vue-router";
import useStorage from "@/services/useStorage";
import AddSongs from "@/components/AddSongs.vue";

export default {
  props: ["id"],
  components: { AddSongs },
  setup(props) {
    const { error, document } = getDocument("playlist", props.id);
    const { user } = getUser();
    const { deleteDoc } = useDocument("playlist", props.id);
    const router = useRouter();
    const { deleteImg } = useStorage();
    // isOwner
    const isOwner = computed(() => {
      return (
        document.value && user.value && user.value.uid == document.value.userId
      );
    });
    // Delete playlist
    const deletePlaylist = async () => {
      await deleteDoc();
      await deleteImg(document.value.imgPath);
      router.push({ name: "Home" });
    };
    return { document, error, isOwner, deletePlaylist };
  },
};
</script>

<style scoped>
h3 {
  color: #333;
}
.playlist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  margin: 50px auto;
}
.img-cover {
  background: linear-gradient(
    rgba(170, 20, 240, 0.938),
    rgba(219, 88, 40, 0.938),
    rgba(238, 46, 174, 0.938)
  );
  padding: 30px;
  border-radius: 30px;
}
.img {
  border-radius: 30px;
  max-width: 250px;
  max-height: 200px;
}
.description {
  margin: 15px 0;
}
.delete-playlist {
  margin-top: 40px;
}
</style>