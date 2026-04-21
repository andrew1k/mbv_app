<!--suppress JSUnresolvedReference -->
<template>
  <v-card rounded="0" variant="text">
    <v-card class="ma-2 text-mono">
      <v-card-title class="ma-0 py-0">
        {{ user?.firstName + ' ' + user?.secondName }}
        <VIcon
          :icon="user?.verificationPerson ? 'mdi-check-decagram': 'mdi-check-decagram-outline'"
          :color="user?.verificationPerson ? 'green': 'red'"
          size="x-small"
        />
        <v-card-subtitle>
          {{ user?.birthDate + ' => ' }} <b>{{ userAge }}</b>
        </v-card-subtitle>
        <v-card-subtitle>
          {{ user?.personGender }}
        </v-card-subtitle>
      </v-card-title>
      <v-card-title class="ma-0 py-0">
        <a :href="`mailto:${user?.email}`">{{ user?.email }}</a>
      </v-card-title>
      <v-card-title class="ma-0 py-0">
        <a :href="`phone:+7${user?.phoneNumber}`">+7{{ user?.phoneNumber }}</a>
      </v-card-title>
      <VDivider/>
      <v-card-title class="ma-0 py-0">
        Семья
        <v-card-subtitle>
          Статус отношений: {{ user?.familyStatus }}
        </v-card-subtitle>
        <v-card-subtitle>
          Дети: {{ user?.childrenStatus }}
        </v-card-subtitle>
      </v-card-title>
      <VDivider/>
      <v-card-title class="ma-0 py-0">
        Церковь
        <v-card-subtitle>
          Церковный Уровень: <b>{{ user?.churchLevel }}</b>
        </v-card-subtitle>
        <v-card-subtitle>
          Членство церкви: {{ user?.churchMembership ? 'да' : 'нет' }}
        </v-card-subtitle>
        <v-card-subtitle>
          Верифицирован в приложении: {{ user?.verificationPerson ? 'да' : 'нет' }}
        </v-card-subtitle>
        <v-card-subtitle>
          Дата крещения: {{ user?.baptismDate ? user?.baptismDate : 'нет' }}
        </v-card-subtitle>
        <v-card-subtitle>
          Пройденные шаги: {{ user?.stepsPassed }}
        </v-card-subtitle>
        <v-card-subtitle>
          Команды служений: {{ user?.servTeam }}
        </v-card-subtitle>
      </v-card-title>
      <VDivider/>
      <v-card-title>
        Комментарии:
        <v-card-subtitle v-for="(comment, i) in user.adminComments" :key="i">
          {{ comment }}
        </v-card-subtitle>
      </v-card-title>
      <VDivider/>
      <v-card-title>
        Записан на мероприятия:
        <v-card-subtitle v-for="(event, i) in user.signedEvents" :key="i">
          {{ event }}
        </v-card-subtitle>
      </v-card-title>
    </v-card>
  </v-card>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '@/plugins/firebase.config'

const props = defineProps({
  id: {
    type: String,
  },
})

const user = ref({})

onMounted(async () => {
  const snap = await getDoc(doc(db, 'users', props.id))
  if (snap.exists()) user.value = snap.data()
})

const userAge = computed(() => {
  const birthdate = new Date(user.value?.birthDate)
  const today = new Date()
  return today.getFullYear() - birthdate.getFullYear() -
    (today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()))
})

</script>
