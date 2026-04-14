<!--suppress JSUnresolvedReference -->
<template>
  <v-card variant="text" rounded="0">
    <v-card class="ma-2">
      <LiteYouTubeEmbed :id="sunday.id" :title="sunday.title"/>
    </v-card>
<!--    <h3 class="text-center my-3">{{ sunday.title }}</h3>-->
    <v-card class="ma-2 pa-2">
      <h4 class="ma-2">Конспект проповеди</h4>
      <VTextarea :model-value="sunday.text" auto-grow />
      <!-- <QuillEditor  v-model:content="sunday.text" content-type="html" toolbar="minimal"/> -->
      <v-card-actions>
        <!-- <vSpacer/>
        <v-btn
          @click="saveSundayNotes(sunday)"
          variant="outlined"
          prepend-icon="mdi-bookmark-outline"
        >
          Сохранить`
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'
import {useContentStore} from '@/store/content.store'
import {storeToRefs} from 'pinia'
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const contentStore = useContentStore()
const {sunday} = storeToRefs(contentStore)
const {saveSundayNotes} = contentStore

</script>
