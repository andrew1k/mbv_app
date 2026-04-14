<template>
  <v-card rounded="0" variant="text">
    <ProfileView/>
    <v-card class="mx-2 mt-4" v-if="isAdmin" to="/admin">
      <VBtn size="large" block>Admin</VBtn>
    </v-card>
    <v-card class="mx-2 mt-4">
      <v-card class="d-flex " @click="prStngs = !prStngs">
        <v-avatar class="ml-3 my-2" variant="outlined">
          <VIcon size="x-large" icon="mdi-cog"/>
        </v-avatar>
        <v-card-title class="my-1">
          Настройки профиля
        </v-card-title>
      </v-card>
      <v-expand-transition>
        <v-card rounded="0" class="mx-2" v-if="prStngs">
          <AccountSettings/>
        </v-card>
      </v-expand-transition>
    </v-card>
    <v-card class="mx-2 mt-4">
      <v-card class="d-flex " @click="authStngs = !authStngs">
        <v-avatar class="ml-3 my-2" variant="outlined">
          <VIcon size="x-large" icon="mdi-shield-lock-outline"/>
        </v-avatar>
        <v-card-title class="my-1">
          Настройки авторизации
        </v-card-title>
      </v-card>
      <v-expand-transition>
        <v-card rounded="0" class="mx-2" v-if="authStngs">
          <AuthSettings/>
        </v-card>
      </v-expand-transition>
    </v-card>
    <!-- <v-card class="mx-2 mt-4" to="/profile/notes">
      <v-card class="d-flex ">
        <v-avatar class="ml-3 my-2" variant="outlined">
          <VIcon size="x-large" icon="mdi-arrow-down"/>
        </v-avatar>
        <v-card-title class="my-1">
          Сохранения
        </v-card-title>
      </v-card>
    </v-card> -->
    <v-card class="mx-2 mt-4">
      <v-card class="d-flex ">
        <v-avatar class="ml-3 my-2" variant="outlined">
          <VIcon size="x-large" icon="mdi-theme-light-dark"/>
        </v-avatar>
        <v-card-title class="my-1">
          Тема оформления
        </v-card-title>
      </v-card>
    </v-card>
    <v-card class="mx-2 mt-4">
      <LogoutBtn/>
    </v-card>
  </v-card>
</template>

<script setup>
import {useAuthStore} from '@/store/auth.store'
import {storeToRefs} from 'pinia'
import AccountSettings from '@/components/profile/AccountSettings.vue'
import AuthSettings from '@/components/profile/AuthSettings.vue'
import {ref} from 'vue'
import ProfileView from '@/components/profile/ProfileView.vue'
import LogoutBtn from '@/components/auth/LogoutBtn.vue'
const authStore = useAuthStore()
const {dbUser, email, isAdmin} = storeToRefs(authStore)

const tab = ref('auth')
const prStngs = ref(false)
const authStngs = ref(false)
</script>
