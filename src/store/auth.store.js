import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {
  createUserWithEmailAndPassword, onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  deleteUser,
} from 'firebase/auth'
import {auth, db} from '@/plugins/firebase.config'
import {doc, setDoc, updateDoc, onSnapshot, getDoc, deleteDoc} from 'firebase/firestore'
import router from '@/router'
import {useSnackbarMessages} from '@/store/snackbarmessages.store'

export const useAuthStore = defineStore('authStore', () => {
  const {setMessage} = useSnackbarMessages() // messages for errors to user
  const user = ref(auth.currentUser)
  const dbUser = ref({})
  const uid = computed(() => user.value.uid)
  const email = computed(() => user.value.email)
  const isAuthed = computed(() => !!user.value)
  const isAdmin = computed(() => user.value.uid === process.env.VUE_APP_ADMIN_ID)
  const userAge = computed(() => {
    const birthdate = new Date(dbUser.value.birthDate)
    const today = new Date()
    return today.getFullYear() - birthdate.getFullYear() -
      (today.getMonth() < birthdate.getMonth() ||
        (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()))
  })
  // calendar part
  const signedEventsIds = ref(computed(() => dbUser.value.signedEvents?.map(e => e.eventId)))

  const appSignup = async (payload) => {  // ------------------------------------------------------------------------------------------------------------------------------------ Done: tests needed
    try {
      const res = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
      if (!res) new Error('Произошла неизвестная ошибка, повторите попытку позже')
      const dbData = {
        email: payload.email,
        firstName: payload.firstName,
        secondName: payload.secondName,
        personGender: payload.personGender,
        birthDate: payload.birthDate,
        phoneNumber: payload.phoneNumber,
        servTeam: [],
        signedEvents: [],
        verificationPerson: false,
        familyStatus: '',
        childrenStatus: [],
        churchMembership: false,
        stepsPassed: [],
        adminComments: [],
        baptismDate: '',
        churchLevel: 1, // 1 = newBorn, 2 = member, 3 = student, 4 = serv, 5 = leader
        listeners: {
          loginsCounter: 0,
          eventRegs: 0,
          formsSend: 0,
          notificationsRead: 0,
        },
      }
      await setDoc(doc(db, 'users', res.user.uid), dbData)
      await onSnapshot(doc(db, 'users', res.user.uid), (snapshot) => {
        dbUser.value = snapshot.data()
      })
      await router.push({name: 'Home'})
    } catch (e) {
      setMessage(e.message)
    }
  }
  const appLogin = async (payload) => {  // ------------------------------------------------------------------------------------------------------------------------------------ Done: test needed
    try {
      const res = await signInWithEmailAndPassword(auth, payload.email, payload.password)
      if (!res) new Error('Ошибка входа, нет ответа с сервера')
      await router.push({name: 'Home'})
    } catch (e) {
      setMessage(e.message)
    }
  }
  const restorePassword = async (payload) => {  // ------------------------------------------------------------------------------------------------------------------------------------
    try {
      await sendPasswordResetEmail(auth, payload.email)
        .catch(e => {
          throw new Error(e.message)
        })
      await router.go(0)
      setMessage('Мы отправили вам сообщение')
    } catch (e) {
      setMessage(e.message)
    }
  }
  const appLogout = async () => {
    try {
      await signOut(auth)
      router.go(0)
    } catch (e) {
      setMessage(e.message)
    }
  }
  //  До запуска можно пропустить
  const appUpdateUserData = async (payload) => {
    try {
      await updateDoc(doc(db, 'users', user.value.uid), {
        firstName: payload.firstName,
        secondName: payload.secondName,
        birthDate: payload.birthDate,
        phoneNumber: payload.phoneNumber,
      })
      console.log(payload)
    } catch (e) {
      setMessage(e.message)
    }
  }
  const appUpdateEmail = (email) => {
    try {
      updateEmail(auth.currentUser, email)
        .then(() => {
          updateDoc(doc(db, 'users', user.value.uid), {
            email,
          }).then(() => {
            setMessage('Всё хорошо')
          })
        })
        .catch(e => {
          throw new Error(e.message)
        })
    } catch (e) {
      setMessage(e.message)
    }
  }
  const appUpdatePassword = (password) => {
    try {
      updatePassword(auth.currentUser, password)
        .then(() => {
          setMessage('Успешно обновлен')
        })
        .catch((e) => {
          throw new Error(e.message)
        })
    } catch (e) {
      setMessage(e.message)
    }
  }
  const appDeleteAcc = async () => {
    try {
      const dbSnap = await getDoc(doc(db, 'users', auth.currentUser.uid))
        .catch(() => {
          throw new Error('Произошла ошибка, пожалуйста, напишите в поддержку')
        })
      await setDoc(doc(db, 'deletedUsers', auth.currentUser.uid), dbSnap.data())
        .catch(() => {
          throw new Error('Произошла ошибка, пожалуйста, напишите в поддержку')
        })
      await deleteDoc(doc(db, 'users', auth.currentUser.uid))
        .catch(() => {
          throw new Error('Произошла ошибка, пожалуйста, напишите в поддержку')
        })
      await deleteUser(auth.currentUser)
        .catch(e => {
          throw new Error('Произошла ошибка, пожалуйста, напишите в поддержку' + e.message)
        })
    } catch (e) {
      setMessage(e.message)
    }
  }

  // realtime actions for getting current state of user
  onAuthStateChanged(auth, (_user) => {
    user.value = _user
    if (_user) onSnapshot(doc(db, 'users', _user.uid), (snapshot) => {
      dbUser.value = snapshot.data()
    })
  })
  if (auth.currentUser) onSnapshot(doc(db, 'users', auth.currentUser.uid), (snapshot) => {
    dbUser.value = snapshot.data()
  })

  return {
    uid,
    dbUser,
    email,
    isAuthed,
    isAdmin,
    userAge,
    signedEventsIds,
    appLogin,
    appSignup,
    appLogout,
    restorePassword,
    appUpdateUserData,
    appUpdateEmail,
    appUpdatePassword,
    appDeleteAcc,
  }
})
