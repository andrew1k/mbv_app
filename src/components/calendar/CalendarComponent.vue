<template>
  <Calendar
    expanded
    borderless
    transparent
    :attributes="attrs"
    locale="ru"
    :min-date="new Date()"
    :is-dark="theme === 'dark'"
    @dayclick="dayClick"
  />

</template>

<script setup>
import {Calendar} from 'v-calendar'
import {ref} from 'vue'
import {useCalendarEventsStore} from '@/store/calendar.store'
import {storeToRefs} from 'pinia'
import {useAppState} from '@/store/app.store'

const calendarEventsStore = useCalendarEventsStore()
const {allCalendarEvents, filterDay} = storeToRefs(calendarEventsStore)
const {getCalendarEvents} = calendarEventsStore
getCalendarEvents()
const appState = useAppState()
const {theme} = storeToRefs(appState)

let attrs = ref([])
allCalendarEvents.value.map(evnt => {
  attrs.value.push({
    key: evnt.id,
    dates: new Date(evnt.start),
    dot: evnt.color,
    popover: {
      label: evnt.title,
      visibility: 'click',
      hideIndicator: true,
    },
  })
})

const dayClick = ({date}) => {
  filterDay.value = date
}
</script>
