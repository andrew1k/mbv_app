<template>
<v-card rounded="0" variant="text">
  <v-card class="ma-2">
    <PurposesCards :img="img" :text="text" />
  </v-card>
</v-card>
</template>

<script setup>
//   TODO: Присоединиться к марафону
import img from '@/assets/worshipPics/PrayerWorship.jpg'
import PurposesCards from '@/components/purposes/PurposesCards.vue'
import {ref} from 'vue'

const text = ref(`<h2>Вечера молитвы и поклонения</h2><br/>
- По средам в 19:00 в Малом Зале Церкви <br><br>
<h2>Молодежная молитва</h2><br>
- Последняя среда месяца в 19:00 в Малом Зале Церкви<br><br>
<h2>День поста</h2><br>
Первая среда месяца <br>
- Утренняя молитва в 10:00 в Малом Зале Церкви <br>
- Вечерняя межцерковная молитва в 19:00 в Большом Зале Церкви <br>
- Суточный пост со вторника 21:00 до среды 21:00 <br><br>

<h2>Молитвенный марафон Молитвенного Союза РОСХВЕ</h2><br>
Первого числа каждого месяца наша церковь принимает участие в молитвенном марафоне, где церкви по всей России 24/7 молятся за осуществление Божественного предназначения России<br>
`)
</script>
