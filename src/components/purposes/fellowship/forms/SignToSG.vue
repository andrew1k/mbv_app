<template>
  <VSelect
    v-model="from"
    :items="selectForm"
    :item-value="value"
    :item-title="title"
    label="Откуда вы узнали о малых группах?"
    variant="outlined"
    class="mx-2 mt-4"
  />
  <VTextField
    label="Район, где вам удобно посещать Малую Группу"
    v-model="metro"
    variant="outlined"
    class="ma-2"
    counter
    maxlength="30"
  />
  <VDivider/>
  <v-card-text>
    Ниже вы можете ознакомиться с группами и выбрать подходящую, или просто нажмите "присоединиться". Вы
    можете воспользоваться поиском или сортировкой, выбрав нужную вам категорию
  </v-card-text>
  <VTextField
    prepend-inner-icon="mdi-magnify"
    v-model="searchText"
    label="Поиск по ведущему, метро, возрасту"
    variant="outlined"
    class="ma-2"
  />
  <VDataTableVirtual
    select-strategy="single"
    v-model="leader"
    show-select
    fixed-header
    :headers="tableHeader"
    :items="sgLeadersData"
    :search="searchText"
    height="400"
    must-sort
  />
  <v-card-actions>
    <VSpacer/>
    <v-btn block variant="outlined" elevation="0" @click="sendForm('fellowship', {leader, metro, from}, 'Записаться в мг')">
      Присоединиться
    </v-btn>
  </v-card-actions>
</template>

<script setup>
import {ref} from 'vue'
import {useContentStore} from '@/store/content.store'
import {storeToRefs} from 'pinia'
import {useFormsStore} from '@/store/form.store'

const sgLeadersTable = useContentStore()
const {getSGLeaders} = sgLeadersTable
getSGLeaders()
const {sgLeadersData} = storeToRefs(sgLeadersTable)


const searchText = ref()

const selectForm = ref([
  {title: 'Соц.Сети церкви', value: 'Соц.Сети церкви'},
  {title: 'Услышали на служении в церкви', value: 'Услышали на служении в церкви'},
  {title: 'Узнали от друзей', value: 'Узнали от друзей'},
  {title: 'Увидели листовку', value: 'Увидели листовку'},
  {title: 'На шаге 1 или 2', value: 'На шаге 1 или 2'},
  {title: 'На сайте', value: 'На сайте'},
  {title: 'Другое', value: 'Другое'},
])

const from = ref([])
const metro = ref('')
const leader = ref([])

const tableHeader = ref([
  {
    title: 'Метро',
    align: 'start',
    sortable: true,
    key: 'subway',
  }, {
    title: 'Ведущий',
    align: 'start',
    sortable: true,
    key: 'leader',
  }, {
    title: 'День',
    align: 'start',
    sortable: true,
    key: 'day',
  }, {
    title: 'Тип',
    align: 'start',
    sortable: true,
    key: 'type',
  }, {
    title: 'Возраст',
    align: 'start',
    sortable: true,
    key: 'ageVal',
  },
])

const {sendForm} = useFormsStore()
</script>
