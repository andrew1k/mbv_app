<template>
  <v-card
    class="my-2 ml-2 mr-2"
    height="200"
    width="200"
    :image="img"
    :to="route ? route : false"
    :href="href ? href : false"
  >
    <div class="fill-height bottom-gradient d-flex align-end">
      <h3 class="text-white mx-3 my-2">{{title}}</h3>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  img: {
    type: String,
    required: true,
  },
  title: {
    required: true,
    type: String,
  },
  route: {
    required: false,
  },
  href: {
    default: '',
  }
})
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 0%,
    transparent 250px
  );
}
</style>
