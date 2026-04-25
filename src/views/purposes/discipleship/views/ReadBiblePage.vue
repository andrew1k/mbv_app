<template>
  <v-card elevation="0" rounded="0" variant="text">
    <v-card class="ma-2">
      <PCard
        title="Семинар - Шаг 2 «Ученичество»"
        btn="Записаться на Шаг 2"
        :img="step"
        :text="stepText"
        @toggler-btn="signToStep = !signToStep"
      />
    </v-card>
    <v-expand-transition>
      <v-card v-show="signToStep" variant="text" elevation="0" rounded="0" class="ma-2">
        <VCardText>Запишитесь на ближайший шаг в календаре и Вам придет уведомление за день до семинара</VCardText>
        <EventCard
          v-for="evnt in filteredEvents"
          :key="evnt.id"
          :event-title="evnt.title"
          :event-text="evnt.text"
          :event-time="evnt.start"
          :event-color="evnt.color"
          :event-icon="evnt.icon"
          :event-id="evnt.id"
          @sign-btn="signToEvent(evnt)"
          @unsign-btn="unsignToEvent(evnt)"
          :show="true"
        />
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
import step from '@/assets/discepleshipPics/step.jpg'
import PCard from '@/components/purposes/PurposesCards.vue'
import EventCard from '@/components/calendar/EventCard.vue'
import {useCalendarEventsStore} from '@/store/calendar.store'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'

const signToStep = ref(false)

const stepText = ref(`Это 4-х часовой семинар, который является второй ступенью процесса духовного роста человека.
<br/> На семинаре рассказывается о том, какие привычки и навыки нужно иметь каждому христианину, чтобы стать духовно зрелым учеником, а также о том, как понять Библию, как правильно молиться, почему церковь учит о десятине и почему так важно быть частью малой группы.
<br/> На семинаре предоставляется материал, который служит хорошим помощником для того, чтобы духовное возрастание было максимально легким и комфортным.`)

const calendarEventsStore = useCalendarEventsStore()
const {allCalendarEvents} = storeToRefs(calendarEventsStore)
const filteredEvents = ref([])
const {signToEvent, unsignToEvent} = calendarEventsStore

filteredEvents.value = allCalendarEvents.value.filter(evnt => {
  if (evnt.chipValues.includes('second')) return evnt
})
</script>
