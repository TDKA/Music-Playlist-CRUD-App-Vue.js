<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist">
    <div class="img-cover">
      <img :src="playlist.imgUrl" alt="" class="img" />
    </div>
    <div class="info-playlist">
      <h3>{{ playlist.title }}</h3>
      <p class="description">{{ playlist.description }}</p>
      <small class="username">
        <i>Créé par: {{ playlist.username }}</i>
      </small>
      <div class="delete-playlist">
        <button class="btn-second" @click="deletePlaylist">Supprimer</button>
      </div>
    </div>
  </div>
  <div class="songs">
    <div class="songs-length">
      <h3 class="title-songs">Chansons pour cette playlist:</h3>
      <p v-if="!playlist.songs.length">Pas de chanson pour cette playlist..</p>
      <div v-for="song in playlist.songs" :key="song.id">
        <div class="songs-list">
          <p class="song-info">
            <i class="fas fa-music"></i> {{ song.title }} <br />
          </p>
          <p class="song-info">
            {{ song.artist }}
          </p>
          <button
            class="btn-second"
            v-if="isOwner"
            @click="deleteSong(song.id)"
          >
            <i class="fas fa-trash fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="add-song">
      <AddSongs v-if="isOwner" :playlist="playlist" />
    </div>
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
    const { error, document: playlist } = getDocument("playlist", props.id);
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument("playlist", props.id);
    const router = useRouter();
    const { deleteImg } = useStorage();

    // isOwner
    const isOwner = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });
    // Delete playlist
    const deletePlaylist = async () => {
      await deleteDoc();
      await deleteImg(playlist.value.imgPath);
      router.push({ name: "Home" });
    };

    //Delete Song
    const deleteSong = async (id) => {
      const songsFiltred = playlist.value.songs.filter((song) => song.id != id);
      await updateDoc({
        songs: songsFiltred,
      });
    };
    return { playlist, error, isOwner, deletePlaylist, deleteSong };
  },
};
</script>

<style scoped>
.fa-trash {
  color: var(--second-color);
}
h3 {
  color: #333;
}
.title-songs {
  text-align: center;
  color: #333;
}
.playlist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  margin: 50px auto;
}
.songs {
  display: flex;
  margin-bottom: 10px auto;
  justify-content: space-around;
  align-items: center;
}
.songs-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin: 20px;
  background: #eeeeee;
  padding: 10px 14px;
  border-radius: 30px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
}
.songs-length {
  margin: 0 auto;
}
.song-info {
  margin: 10px;
  font-size: 17px;
}
.add-song {
  margin: 0 auto;
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

@media (max-width: 5400px) {
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
    max-width: 130px;
    max-height: 100px;
  }
  .info-playlist {
    font-size: 16px;
  }
  .delete-playlist {
    padding: 10px 14px;
    font-size: 14px !important;
    margin-top: 7px;
  }
  .songs {
    flex-direction: column;
  }
  .songs-list {
    max-width: 400px;
  }
  .fa-trash {
    font-size: 17px;
  }
}
</style>