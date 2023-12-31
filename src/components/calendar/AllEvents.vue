<template>
  <h2 v-if="allCalendarEvents.length" class="ml-4 mt-6 font-weight-medium">Все события в нашей церкви</h2>
  <h2 v-if="!allCalendarEvents.length" class="ml-4 mt-6 font-weight-medium">Пока что нет новых событий</h2>
  <v-card variant="text" elevation="0">
    <v-chip-group
      v-model="selectedChip"
      filter
      class="mx-2 text-center"
    >
      <VChip
        v-for="chip in eventsChips"
        :key="chip.title"
        :color="chip.color"
        :text="chip.title"
        :value="chip.value"
      />
    </v-chip-group>
  </v-card>
  <calendar-event-card
    v-for="evnt in filteredEvents.length ? filteredEvents : allCalendarEvents"
    :key="evnt.id"
    :event-title="evnt.title"
    :event-text="evnt.text"
    :event-time="evnt.start"
    :event-color="evnt.color"
    :event-icon="evnt.icon"
    :event-id="evnt.id"
    :btn-title="evnt.btnTitle"
    :btn="evnt.btn"
    @sign-btn="signToEvent(evnt)"
    @unsign-btn="unsignToEvent(evnt)"
  >
    <template #deleteBtnSpace>
      <v-btn prepend-icon="mdi-close" color="error" v-if="isAdmin" variant="flat" @click="deleteEvent(evnt)">
        Delete
      </v-btn>
    </template>
    <template #signedUsers>
      <v-chip-group variant="text" v-if="isAdmin">
        <v-chip
          :to="{ name: 'User', params: { id: user.id }}"
          variant="outlined"
          v-for="(user, i) in evnt.signedAccounts"
          :key="i"
        >
          {{ user.userLink }}
        </v-chip>
      </v-chip-group>
    </template>
  </calendar-event-card>
</template>

<script setup>
import CalendarEventCard from '@/components/calendar/EventCard.vue'
import {useCalendarEventsStore} from '@/store/calendar.store'
import {storeToRefs} from 'pinia'
import {watch, ref} from 'vue'
import {useAuthStore} from '@/store/auth.store'

const calendarEventsStore = useCalendarEventsStore()
const {allCalendarEvents, filterDay} = storeToRefs(calendarEventsStore)
const filteredEvents = ref([])
const {signToEvent, unsignToEvent, deleteEvent} = calendarEventsStore
const {isAdmin} = useAuthStore()

const eventsChips = ref([
  {
    value: '',
    title: 'все события',
    color: 'teal',
  }, {
    value: 'ministry',
    title: 'служение',
    color: 'brown',
  }, {
    value: 'fellowship',
    title: 'общение',
    color: 'orange',
  }, {
    value: 'discepleship',
    title: 'ученичество',
    color: 'green',
  }, {
    value: 'evangelism',
    title: 'благовестие',
    color: 'blue',
  }, {
    value: 'worship',
    title: 'поклонение',
    color: 'red',
  }, {
    value: 'youth',
    title: 'молодежное',
    color: 'indigo',
  }
])

const selectedChip = ref([])

watch(selectedChip, () => {
  if (selectedChip.value) {
    filteredEvents.value = allCalendarEvents.value.filter(evnt => {
      if (evnt.chipValues.includes(selectedChip.value)) return evnt
    })
  } else {
    filteredEvents.value = allCalendarEvents.value
  }
})

watch(filterDay, () => {
  if (filterDay.value) {
    filteredEvents.value = allCalendarEvents.value.filter(evnt => {
      if (new Date(evnt.start).toDateString() === filterDay.value.toDateString()) {
        return evnt
      } else {
        filteredEvents.value = allCalendarEvents.value
      }
    })
  }
})
</script>
