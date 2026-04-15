<!--suppress JSUnresolvedReference -->
<template>
  <h2 class="mt-6 ml-4 font-weight-medium">Свежая проповедь</h2>
  <v-card class="ma-2" v-if="isPending || !sunday.id">
      <v-skeleton-loader type="image"/>
  </v-card>
  <v-card v-if="!isPending && sunday.id" to="/sunday" class="ma-2 bottom-gradient">
    <VImg cover :aspect-ratio="16/9" :src="`https://img.youtube.com/vi/${sunday?.id}/0.jpg`">
      <div class="fill-height bottom-gradient d-flex flex-column align-center justify-end">
        <p class="text-white px-2 text-center">{{ sunday.title }}</p>
        <v-btn
          class="my-3"
          color="surface"
          variant="outlined"
          to="/sunday"
        >
          Перейти
        </v-btn>
      </div>
    </VImg>

  </v-card>
</template>

<script setup>
import {useContentStore} from '@/store/content.store'
import {storeToRefs} from 'pinia'
import {useAppState} from '@/store/app.store'

const contentStore = useContentStore()
const {sunday} = storeToRefs(contentStore)

const appState = useAppState()
const {isPending} = storeToRefs(appState)
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    transparent 250px
  );
}
</style>
