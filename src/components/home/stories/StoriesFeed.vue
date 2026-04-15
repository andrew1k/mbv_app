<template>
  <v-card min-height="100" variant="text" rounded="0" class="mx-1">
    <v-slide-group v-if="isPending || !stories.length">
      <v-slide-group-item>
        <v-card height="100" width="90" class="my-2 mx-1">
          <VSkeletonLoader type="image"/>
        </v-card>
        <v-card height="100" width="90" class="my-2 mx-1">
          <VSkeletonLoader type="image"/>
        </v-card>
        <v-card height="100" width="90" class="my-2 mx-1">
          <VSkeletonLoader type="image"/>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
    <v-slide-group v-show="!isPending" v-model="model" selected-class="bg-primary">
      <v-slide-group-item
        v-for="story in stories"
        :key="story.id"
      >
        <StoryCard
          :title="story.title"
          :link="story.link"
          :link-label="story.linkLabel"
          :link-color="story.linkColor"
          :prev-img="story.previewImgUrl"
          :story-imgs="story.storyImages"
          :color="story.color"
        />
      </v-slide-group-item>
    </v-slide-group>
  </v-card>
</template>

<script setup>
import {useContentStore} from '@/store/content.store'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
import StoryCard from '@/components/home/stories/StoryCard.vue'
import {useAppState} from '@/store/app.store'

const newsfeedStore = useContentStore()
const {stories} = storeToRefs(newsfeedStore)

const appState = useAppState()
const {isPending} = storeToRefs(appState)

const model = ref(null)
</script>
