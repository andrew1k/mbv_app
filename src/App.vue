<template>
  <v-app :theme="theme">
    <v-scroll-y-transition>
      <v-snackbar
        v-model="snackbarMessage"
        multi-line
        location="top"
        rounded="xl"
        class="mt-6"
      >
        {{ snackbarMessage }}
      </v-snackbar>
    </v-scroll-y-transition>
    <RouterView/>
  </v-app>
</template>

<script setup>
import {onMounted} from 'vue'
import {useSnackbarMessages} from '@/store/snackbarmessages.store'
import {storeToRefs} from 'pinia'
import {useAppState} from '@/store/app.store'
import {useHomeLoaderStore} from '@/store/homeLoader.store'

const snackbarMessages = useSnackbarMessages()
const {snackbarMessage} = storeToRefs(snackbarMessages)
const {theme} = storeToRefs(useAppState())

const homeLoader = useHomeLoaderStore()

onMounted(() => {
  homeLoader.init()
  homeLoader.addLoadingListener(event => {
    console.debug('Home loader event:', event)
  })
  homeLoader.loadAllHomeData().catch(() => {})
})
</script>
