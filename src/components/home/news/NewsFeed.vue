<template>
  <h2 class="mt-6 ml-4 font-weight-medium">Это интересно</h2>
  <!--                                             News Cards                  -->
  <v-card class="ma-2" v-if="!news.length">
    <v-skeleton-loader type="card" />
  </v-card>
  <NewsCard
    v-for="item in news"
    :key="item.id"
    :title="item.title"
    :subtitle="item.subtitle"
    :img="item.url"
    :id="item.id"
  />
</template>

<script setup>
import NewsCard from '@/components/home/news/NewsCard.vue'
import {useContentStore} from '@/store/content.store'
import {storeToRefs} from 'pinia'

const contentStore = useContentStore()
const {news} = storeToRefs(contentStore)
</script>
