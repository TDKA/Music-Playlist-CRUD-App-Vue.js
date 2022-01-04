<template>
  <form @submit.prevent="submitForm">
    <h2>Créer un nouveau playlist</h2>
    <input type="text" placeholder="Titre de playliste" v-model="title" />
    <div>
      <textarea
        required
        placeholder="Description de playlist"
        v-model="description"
      ></textarea>
    </div>
    <input
      type="file"
      class="uploadImg"
      placeholder="Télécharger l'image de couverture"
      @change="handleChange"
    />
    <div class="error">{{ errorImg }}</div>
    <div class="btn-container">
      <button v-if="!isLoading" class="btn-main">Créez</button>
      <button v-if="isLoading" class="btn-main">Proceed</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/services/useStorage";
import useCollection from "@/services/useCollection";
import getUser from "@/services/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { imgPath, url, uploadImg } = useStorage();
    const { user } = getUser();
    const { error, addDocument } = useCollection("playlist");

    const router = useRouter();
    const isLoading = ref(false);

    const errorImg = ref(null);
    const title = ref("");
    const description = ref("");
    const img = ref(null);

    // submit form
    const submitForm = async () => {
      if (img.value) {
        isLoading.value = true;
        await uploadImg(img.value);
        const res = await addDocument({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          username: user.value.displayName,
          imgUrl: url.value,
          imgPath: imgPath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isLoading.value = false;
        if (!error.value) {
          router.push({ name: "Details", params: { id: res.id } });
        }
        console.log("img uploaded", url.value);
      }
    };

    // check type of img
    const typeImg = ["image/png", "image/jpeg", "image/jpg"];

    // upload image
    const handleChange = (e) => {
      const selectedImg = e.target.files[0];
      if (selectedImg && typeImg.includes(selectedImg.type)) {
        img.value = selectedImg;
      } else {
        img.value = null;
        errorImg.value =
          "Veuillez sélectionner une image avec l'un de ces types('png', 'jpeg')";
        console.log(img.value);
      }
    };

    return {
      title,
      description,
      submitForm,
      handleChange,
      errorImg,
      isLoading,
    };
  },
};
</script>

<style>
[type="file"]::-webkit-file-upload-button {
  background: var(--third-color);
  border: 2px solid var(--second-color);
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  outline: none;
  padding: 13px 25px;
  text-transform: uppercase;
  transition: all 1s ease;
}

[type="file"]::-webkit-file-upload-button:hover {
  background: #fff;
  border: 2px solid #535353;
  color: #000;
}

form div {
  text-align: center;
}
textarea {
  width: 80%;
  border-radius: 20px;
  padding: 10px;
}
</style>