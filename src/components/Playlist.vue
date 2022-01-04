<template>
  <ul class="lists" v-for="list in docs" :key="list.id">
    <router-link :to="{ name: 'Details', params: { id: list.id } }">
      <li class="single">
        <ul v-if="docs">
          <li class="listItem">
            <h4>{{ list.title }}</h4>
            <div class="playlistImg">
              <img :src="list.imgUrl" alt="" />
            </div>
          </li>
        </ul>
      </li>
    </router-link>
  </ul>
</template>

<script>
import getCollection from "@/services/getCollection";
export default {
  setup() {
    const { docs, error } = getCollection("playlist");

    return { docs, error };
  },
};
</script>

<style>
h4 {
  color: var(--second-color);
}
.single:nth-child(odd) {
  background: #f4f4f4;
  max-width: 500px;
  margin: 0 auto;
}

.listItem {
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  background: var(--third-color);
  animation: 13s ease infinite alternate-reverse listItems;
  padding: 10px 40px;
  position: relative;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.8);
}
.playlistImg {
  max-width: 210px;
}
.playlistImg img {
  border-radius: 50%;
  max-width: 210px;
  max-height: 140px;
}

/* Animations lists */
.lists {
  position: relative;
  margin-bottom: 50px;
}
.lists:nth-child(odd) {
  animation: 20s ease infinite alternate-reverse oddItems;
}
@keyframes oddItems {
  0% {
    transform: translate(15%, 15%);
  }
  25% {
    transform: translate(-15%, -15%);
  }
  50% {
    transform: translate(15%, 15%);
  }
  75% {
    transform: translate(-15%, -15%);
  }
  100% {
    transform: translate(15%, 15%);
  }
}
.lists:nth-child(even) {
  animation: 20s ease infinite alternate-reverse evenItems;
}
@keyframes evenItems {
  0% {
    transform: translate(-10%, -10%);
  }
  25% {
    transform: translate(10%, 10%);
  }
  50% {
    transform: translate(-10%, -10%);
  }
  75% {
    transform: translate(10%, 10%);
  }
  100% {
    transform: translate(-10%, -10%);
  }
}

@keyframes listItems {
  0% {
    background: rgba(170, 20, 240, 0.938);
  }
  25% {
    background: rgba(219, 88, 40, 0.938);
  }
  50% {
    background: rgba(238, 46, 174, 0.938);
  }
  75% {
    background: rgba(170, 20, 240, 0.938);
  }
  100% {
    background-color: rgba(219, 88, 40, 0.938);
  }
}
</style>