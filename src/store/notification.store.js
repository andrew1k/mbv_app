import {defineStore} from 'pinia'
import {LocalNotifications} from '@capacitor/local-notifications'
import {useSnackbarMessages} from '@/store/snackbarmessages.store'
import { PushNotifications } from '@capacitor/push-notifications'

export const useNotificationsStore = defineStore('notificationsStore', () => {
  const {setMessage} = useSnackbarMessages()


    // TODO: добавить PushNotifications https://capawesome.io/blog/the-push-notifications-guide-for-capacitor/
  const scheduleCalendarNotification = (event) => {
    LocalNotifications.checkPermissions()
      .then(() => {
        LocalNotifications.schedule({
          notifications: [{...event}],
        }).then(() => {
          setMessage(`Отлично, вы записались на ${event.title}`)
        }).catch((e) => {
          setMessage('Что-то пошло не так, обновите настройки уведомлений: ' + e)
          LocalNotifications.requestPermissions()
            .catch(() => {
              setMessage('Что-то не так, проверьте настройки вручную')
            })
        })
      }).catch(() => {
      setMessage('Разрешите отправлять вам уведомления')
    })
  }

  const addListeners = async () => {
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
