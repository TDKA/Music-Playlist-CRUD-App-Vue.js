<template>
  <Navbar />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
  setup() {},
};
</script>


<style>
.content {
  max-width: 1300px;
  padding: 0 23px;
  margin: 0 auto;
}
</style>
