import {defineStore} from 'pinia'
import {LocalNotifications} from '@capacitor/local-notifications'
import {useSnackbarMessages} from '@/store/snackbarmessages.store'
import { PushNotifications } from '@capacitor/push-notifications'

export const useNotificationsStore = defineStore('notificationsStore', () => {
  const {setMessage} = useSnackbarMessages()

  const requestLocalNotificationPermission = async () => {
    const currentPerm = await LocalNotifications.checkPermissions()
    if (currentPerm.display === 'prompt' || currentPerm.display === 'denied') {
      return LocalNotifications.requestPermissions()
    }
    return currentPerm
  }

  const ensureLocalNotificationPermission = async () => {
    const permStatus = await requestLocalNotificationPermission()
    if (permStatus.display !== 'granted') {
      setMessage('Разрешите локальные уведомления, чтобы получать напоминания о событиях.')
    }
    return permStatus
  }

  const scheduleCalendarNotification = async (event) => {
    try {
      const permStatus = await ensureLocalNotificationPermission()
      if (permStatus.display !== 'granted') return

      await LocalNotifications.schedule({
        notifications: [{...event}],
      })
      setMessage(`Отлично, вы записались на ${event.title}`)
    } catch (e) {
      setMessage('Что-то пошло не так, обновите настройки уведомлений: ' + e.message)
    }
  }

  const addListeners = async () => {
    await LocalNotifications.addListener('localNotificationReceived', notification => {
      console.log('Local notification received:', notification)
    })

    await LocalNotifications.addListener('localNotificationActionPerformed', notification => {
      console.log('Local notification action performed:', notification.actionId, notification.inputValue)
    })

    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value)
    })

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error)
    })

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification)
    })

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue)
    })
  }

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      setMessage('Вы отключили уведомления')
    }

    await addListeners()
    await PushNotifications.register();
  }

  const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }
  return {
    scheduleCalendarNotification,
    addListeners,
    registerNotifications,
    getDeliveredNotifications,
  }
})
