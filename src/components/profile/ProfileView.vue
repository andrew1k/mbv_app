<template>
  <v-card class="ma-2 d-flex flex-column" elevation="0">
    <v-avatar color="background" size="90" class="mx-auto mt-2" @click="changeAvatar">
      <VIcon size="40" icon="mdi-account"/>
    </v-avatar>
    <h2 class="mx-auto my-1 pa-0 font-weight-bold">
      {{ dbUser.firstName + ' ' + dbUser.secondName }}
    </h2>
    <v-card-text class="text-mono pa-0 mb-3 mx-auto">{{ email }}</v-card-text>
  </v-card>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useAuthStore} from '@/store/auth.store'

const changeAvatar = () => {
  alert('coming soon')
}

const authStore = useAuthStore()
const {dbUser, email} = storeToRefs(authStore)
</script>
