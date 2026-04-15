import {defineStore, storeToRefs} from 'pinia'
import {ref} from 'vue'
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  deleteField,
} from 'firebase/firestore'
import {db, auth} from '@/plugins/firebase.config'
import {useAuthStore} from '@/store/auth.store'
import {useNotificationsStore} from '@/store/notification.store'
import {useAppState} from '@/store/app.store'
import {useSnackbarMessages} from '@/store/snackbarmessages.store'

export const useCalendarEventsStore = defineStore('calendarEventsStore', () => {
  // ------------------------------ set snackbar message
  const {setMessage} = useSnackbarMessages()
  // ------------------------------ find out users signed events
  const authStore = useAuthStore()
  const {signedEventsIds, dbUser} = storeToRefs(authStore)
  // ------------------------------ events
  const allCalendarEvents = ref([])
  const weekCalendarEvents = ref([])
  const docIds = ref([])
  const filterDay = ref()
  // ------------------------------ app state
  const appState = useAppState()
  const {startLoading, finishLoading} = appState
  // ------------------------------ snapshot listeners
  const calendarListener = ref(null)

  function safeUnsubscribe(listenerRef) {
    if (listenerRef.value) {
      listenerRef.value()
      listenerRef.value = null
    }
  }

  function snapshotPromise(source, onSnapshotData) {
    return new Promise((resolve, reject) => {
      let settled = false
      const unsubscribe = onSnapshot(source, (snapshot) => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        onSnapshotData(snapshot)
        resolve(unsubscribe)
      }, (error) => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        reject(error)
      })

      const timeout = setTimeout(() => {
        if (settled) return
        settled = true
        resolve(unsubscribe)
      }, 10000)
    })
  }
  // ------------------------------ Notifications
  const {scheduleCalendarNotification} = useNotificationsStore()

  async function getCalendarEvents(force = false) {
    if (calendarListener.value && !force) return
    if (force) safeUnsubscribe(calendarListener)
    startLoading()
    const colRef = collection(db, 'calendar')

    try {
      calendarListener.value = await snapshotPromise(colRef, snapshot => {
        let events = []
        let days = {}
        let filteredEvents = []
        // get data from collection
        docIds.value = []
        snapshot.docs.forEach(doc => {
          // get doc ID to docIds Array
          docIds.value.push(doc.id)

          // doc.data() method to get data from docs
          let docData = doc.data()
          let dayEvents = Object.values(docData)

          // make it one array of all events
          events.push(...dayEvents)

          // set object by days and their arrays
          days[doc.id] = dayEvents
        })

        // ------------------------------------------  getting current week
        let curr = new Date()
        let week = []
        for (let i = 1; i <= 7; i++) {
          let first = curr.getDate() - curr.getDay() + i
          let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
          week.push(day)
        }
        // ------------------------------------------ filter documents by week days
        let filteredDays = Object.keys(days)
          .filter(key => week.includes(key))
          .reduce((obj, key) => {
            obj[key] = days[key]
            return obj
          }, {})
        // write all arrays of objects to one array
        Object.values(filteredDays).forEach(arr => {
          filteredEvents.push(...arr)
        })
        allCalendarEvents.value = events.sort((a,b) => {
          const dateA = a.start
          const dateB = b.start
          return dateA - dateB
        })
        weekCalendarEvents.value = filteredEvents
      })
    } catch (e) {
      setMessage(e.message)
      throw e
    } finally {
      finishLoading()
    }
  }

  async function signToEvent(evnt) {
    const eventDay = evnt.start.slice(0, 10)
    const docRef = doc(db, 'calendar', eventDay)
    const eventId = evnt.id
    const userLink = `${dbUser.value.firstName} ${dbUser.value.secondName}`
    const d = new Date(evnt.start)

    // Проверка на существование записи
    if (!signedEventsIds.value.includes(eventId)) {
      await updateDoc(docRef, {
        [eventId + '.signedAccounts']: arrayUnion({id: auth.currentUser.uid, userLink}),
      })
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        signedEvents: arrayUnion({eventDay, eventId}),
      })
      await scheduleCalendarNotification({
        title: 'Напоминание о мероприятии в церкви Миссия Благая Весть',
        body: evnt.title,
        id: +eventId.slice(5),
        schedule: { at: new Date(d.setDate(d.getDate() - 1)) },
      })
      await setMessage(`Отлично, теперь вы записаны на ${evnt.title}`)
    }
    console.log(d.setDate(d.getDate() - 1))
  }

  async function unsignToEvent(evnt) {
    const eventDay = evnt.start.slice(0, 10)
    const docRef = doc(db, 'calendar', eventDay)
    const eventId = evnt.id
    const userLink = `${dbUser.value.firstName} ${dbUser.value.secondName}`

    await updateDoc(docRef, {
      [eventId + '.signedAccounts']: arrayRemove({id: auth.currentUser.uid, userLink}),
    })
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      signedEvents: arrayRemove({eventDay, eventId}),
    })
    await setMessage('Вы отписались.')
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------------ admin funcs
  async function saveEventToDB(payload) {
    const id = Date.now().toString()
    const eventToDB = {}
    eventToDB[id] = {
      title: payload.eventTitle,
      icon: payload.chipIcon,
      text: payload.eventText,
      color: payload.eventColor,
      btnTitle: payload.btnTitle,
      btn: payload.isBtn,
      start: `${payload.eventDate}T${payload.eventTime}`,
      id: id,
      chipValues: payload.chipValues
    }

    // проверка на существование в бд записи на этот день, тогда обновляет док
    if (docIds.value.includes(payload.eventDate)) {
      await updateDoc(doc(db, 'calendar', payload.eventDate), eventToDB)
        .then(() => {
          alert('event updated successfully')
        })
    } else {
      await setDoc(doc(db, 'calendar', payload.eventDate), eventToDB)
        .then(() => {
          alert('event saved successfully')
        })
    }
  }
  async function deleteEvent(evnt) {
    const eventDay = evnt.start.slice(0, 10)
    const docRef = doc(db, 'calendar', eventDay)
    const eventId = evnt.id

    if (evnt.signedAccounts) await evnt.signedAccounts.forEach(usr => {
      updateDoc(doc(db, 'users', usr.id), {
        signedEvents: arrayRemove({eventDay, eventId}),
      })
    })
    await updateDoc(docRef, {[eventId]: deleteField()})
  }

  return {
    allCalendarEvents,
    weekCalendarEvents,
    filterDay,
    getCalendarEvents,
    signToEvent,
    unsignToEvent,
    saveEventToDB,
    deleteEvent
  }
})
