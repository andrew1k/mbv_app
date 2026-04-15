<template>
  <h2 class="mt-6 ml-4 font-weight-medium">События недели</h2>
  <v-card rounded="xl" class="mx-2 my-2" v-if="!weekCalendarEvents.length && !isPending">
    <VCardItem prepend-icon="mdi-close" title="Нет событий"/>
  </v-card>
  <v-card rounded="xl" class="mx-1 my-2" v-if="isPending">
    <VSkeletonLoader type="list-item-avatar"/>
  </v-card>
  <v-card rounded="xl" class="mx-1 my-2" v-if="isPending">
    <VSkeletonLoader type="list-item-avatar"/>
  </v-card>
  <CalendarEventCard
    v-for="evnt in weekCalendarEvents"
    :key="evnt.id"
    :event-title="evnt.title"
    :event-text="evnt.text"
    :event-time="evnt.start"
    :event-color="evnt.color"
    :event-id="evnt.id"
    :event-icon="evnt.icon"
    :btn-title="evnt.btnTitle"
    :btn="evnt.btn"
    @sign-btn="signToEvent(evnt)"
    @unsign-btn="unsignToEvent(evnt)"
  />
</template>

<script setup>
import {useCalendarEventsStore} from '@/store/calendar.store'
import {storeToRefs} from 'pinia'
import CalendarEventCard from '@/components/calendar/EventCard.vue'
import {useAppState} from '@/store/app.store'

const calendarEventsStore = useCalendarEventsStore()
const {signToEvent, unsignToEvent} = calendarEventsStore

const {weekCalendarEvents} = storeToRefs(calendarEventsStore)

const appState = useAppState()
const {isPending} = storeToRefs(appState)
</script>
