<template>
  <v-card class="mx-2 mt-2 mb-8" :to="{ name: 'NewsPage', params: { id }}">
    <v-img 
      :src="img" 
      eager 
      :aspect-ratio="16/9" 
      cover
    >
      <template v-slot:placeholder>
        <div class="fill-height">
          <v-skeleton-loader type="image" class="fill-height"/>
        </div>
      </template>
    </v-img>
    <VCardText><h2>{{title}}</h2></VCardText>
    <v-card-text class="py-0">{{subtitle}}</v-card-text>
    <v-card-actions class="mx-0 px-0">
      <v-card-subtitle>{{ new Date(+id).toLocaleDateString() }}</v-card-subtitle>
      <v-spacer/>
      <v-icon class="mx-4" icon="mdi-chevron-right"/>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  img: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  leaderName: {
    type: String,
  },
  leaderUrl: {
    type: String,
  },
})
</script>
